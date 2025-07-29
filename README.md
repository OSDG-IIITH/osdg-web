## Getting Started

for updating linux installation docsi

clone repo with typ code for the documentation

use pandoc to convert typ to html

```
pandoc -o fedora.html fedora.typ 
```

you might wanna delete line 7 in typ file before running that 

then copy fedora.html & assets folder to public/linux-installation/

First, run the development server:

```bash
npm run dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
