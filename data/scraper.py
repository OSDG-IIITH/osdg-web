import requests
from bs4 import BeautifulSoup
import json

response = requests.get(
    'https://clubs.iiit.ac.in/clubs/osdg/members')

soup = BeautifulSoup(response.text, 'html.parser')

scripts = [json.loads(json.loads(script.string[19:-1])[1].partition(':')[2])[3]['children'][3] for script in soup.find_all(
    'script', string=lambda text: 'present' in text if text else False)]

members = [
    {
        'name': script['children'][1][3]['children'].title(),
        'role': script['children'][3][0][3]['children'][0][3]['children'],
        'imageURL': 'https://clubs.iiit.ac.in/_next/image?url=http%3A%2F%2Ffiles%2Ffiles%2Fdownload%3Ffilename%3D' + script['children'][0][3]['image'] + '&w=1080&q=75' if (script['children'][0][3]['image'] and 'undefined' not in script['children'][0][3]['image']) else None,
        'profileURL': 'https://clubs.iiit.ac.in' + script['href']
    } for script in scripts
]

for member in members:
    response = requests.get(member['profileURL'])
    soup = BeautifulSoup(response.text, 'html.parser')
    member['emailID'] = json.loads(json.loads(soup.find('script', string=lambda text: 'iiit.ac.in' in text if text else False).string[19:-1])[
                                   1].partition(':')[2])[3]['children'][1][3]['children'][0][3]['children'][3]['children'][1][3]['children'][1][3]['children']


with open('data/members.json', 'w') as file:
    json.dump(members, file, indent=4)
