"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface TeamMember {
    name: string;
    role: string;
    tenure: string;
    imageUrl: string;
    extra?: string;
}

interface ForceGraphProps {
    teamName: string;
    members: TeamMember[];
    onMemberClick: (member: TeamMember) => void;
}

const ForceGraph: React.FC<ForceGraphProps> = ({ teamName, members, onMemberClick }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

    const placeholderColors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFC04E', '#845EC2'];

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    useEffect(() => {
        const updateDimensions = () => {
            const container = svgRef.current?.parentElement;
            if (container) {
                const containerWidth = container.clientWidth;
                const newWidth = Math.min(containerWidth - 40, 800);
                const newHeight = Math.max(300, Math.min(500, newWidth * 0.6));
                setDimensions({ width: newWidth, height: newHeight });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        if (!svgRef.current || members.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const { width, height } = dimensions;

        // Create nodes: center node + member nodes
        const centerNode = {
            id: `center-${teamName}`,
            name: teamName,
            type: 'center',
            x: width / 2,
            y: height / 2,
            fx: width / 2,
            fy: height / 2
        };

        const memberNodes = members.map((member, index) => ({
            id: `member-${index}`,
            name: member.name,
            type: 'member',
            member,
            index
        }));

        const nodes = [centerNode, ...memberNodes];

        // Create links from center to all members
        const links = memberNodes.map(member => ({
            source: centerNode.id,
            target: member.id
        }));

        // Create force simulation
        const simulation = d3.forceSimulation(nodes as any)
            .force("link", d3.forceLink(links).id((d: any) => d.id).distance(200))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collision", d3.forceCollide().radius(40));

        // Create SVG groups
        const g = svg.append("g");

        // Add zoom behavior
        const zoom = d3.zoom()
            .scaleExtent([0.5, 3])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
            });

        svg.call(zoom as any);

        // Set initial zoom to 60% and center it
        const initialScale = 0.6;
        const initialTranslateX = (width / 2) * (1 - initialScale);
        const initialTranslateY = (height / 2) * (1 - initialScale);
        svg.call(zoom.transform as any, d3.zoomIdentity.scale(initialScale).translate(initialTranslateX / initialScale, initialTranslateY / initialScale));

        // Create a single defs section for all patterns
        const defs = svg.append("defs");

        // Create patterns for member images
        const patterns = defs.selectAll("pattern")
            .data(memberNodes.filter(d => d.member.imageUrl))
            .enter().append("pattern")
            .attr("id", (d: any) => `image-${teamName.replace(/[^a-zA-Z0-9]/g, '_')}-${d.id}`)
            .attr("patternUnits", "objectBoundingBox")
            .attr("width", 1)
            .attr("height", 1);

        patterns.append("image")
            .attr("xlink:href", (d: any) => d.member.imageUrl)
            .attr("width", 70)
            .attr("height", 70)
            .attr("x", 0)
            .attr("y", 0)
            .attr("preserveAspectRatio", "xMidYMid slice");

        // Create links
        const link = g.append("g")
            .selectAll("line")
            .data(links)
            .enter().append("line")
            .attr("stroke", "#6366f1")
            .attr("stroke-opacity", 0.6)
            .attr("stroke-width", 2);

        // Create nodes
        const node = g.append("g")
            .selectAll("g")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")
            .style("cursor", (d: any) => d.type === 'member' ? "pointer" : "default")
            .call(d3.drag()
                .on("start", (event, d: any) => {
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                })
                .on("drag", (event, d: any) => {
                    d.fx = event.x;
                    d.fy = event.y;
                })
                .on("end", (event, d: any) => {
                    if (!event.active) simulation.alphaTarget(0);
                    if (d.type !== 'center') {
                        d.fx = null;
                        d.fy = null;
                    }
                }) as any);

        // Add circles for nodes
        node.append("circle")
            .attr("r", (d: any) => d.type === 'center' ? 90 : 35)
            .attr("fill", (d: any) => {
                if (d.type === 'center') return "#4338ca";
                if (d.type === 'member' && d.member.imageUrl) {
                    return `url(#image-${teamName.replace(/[^a-zA-Z0-9]/g, '_')}-${d.id})`;
                }
                return placeholderColors[d.index % placeholderColors.length];
            })
            .attr("stroke", "#fff")
            .attr("stroke-width", 3);

        // Add text for center node
        node.filter((d: any) => d.type === 'center')
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .attr("fill", "white")
            .attr("font-weight", "bold")
            .attr("font-size", "14px")
            .text((d: any) => d.name);

        // Add initials for members without photos
        node.filter((d: any) => d.type === 'member' && !d.member.imageUrl)
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .attr("fill", "white")
            .attr("font-weight", "bold")
            .attr("font-size", "16px")
            .style("pointer-events", "none")
            .text((d: any) => getInitials(d.member.name));

        // Add member names below nodes
        node.filter((d: any) => d.type === 'member')
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "55px")
            .attr("fill", "#e5e7eb")
            .attr("font-size", "12px")
            .attr("font-weight", "500")
            .text((d: any) => {
                const parts = d.member.name.split(' ');
                if (parts.length === 1) return parts[0];
                return parts[0] + ' ' + parts[parts.length - 1];
            });

        // Add hover effects
        node.filter((d: any) => d.type === 'member')
            .on("mouseover", function (event, d: any) {
                d3.select(this).select("circle")
                    .transition()
                    .duration(200)
                    .attr("r", 45)
                    .attr("stroke-width", 4);

                d3.select(this).select("text")
                    .transition()
                    .duration(200)
                    .attr("font-size", "14px");
            })
            .on("mouseout", function (event, d: any) {
                d3.select(this).select("circle")
                    .transition()
                    .duration(200)
                    .attr("r", 35)
                    .attr("stroke-width", 3);

                d3.select(this).select("text")
                    .transition()
                    .duration(200)
                    .attr("font-size", "12px");
            });

        // Add click handlers
        node.filter((d: any) => d.type === 'member')
            .on("click", (event, d: any) => {
                onMemberClick(d.member);
            });

        // Update positions on tick
        simulation.on("tick", () => {
            link
                .attr("x1", (d: any) => d.source.x)
                .attr("y1", (d: any) => d.source.y)
                .attr("x2", (d: any) => d.target.x)
                .attr("y2", (d: any) => d.target.y);

            node
                .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
        });

        return () => {
            simulation.stop();
        };
    }, [teamName, members, onMemberClick, dimensions]);

    return (
        <div className="w-full flex justify-center">
            <svg
                ref={svgRef}
                width={dimensions.width}
                height={dimensions.height}
                className="border border-gray-700 rounded-lg bg-gray-900"
                style={{ maxWidth: '100%' }}
            />
        </div>
    );
};

export default ForceGraph;
