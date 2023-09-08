rm -rf ~/public_html/dist
cd ~/Discovering-DaVinci/client
npm run build
mv dist/ ~/public_html/
cp -r ~/public_html/static/AerialScrew ~/public_html/dist/static/
cp -r ~/public_html/static/Cart ~/public_html/dist/static/
cp -r ~/public_html/static/PrintingPress ~/public_html/dist/static/
cp -r ~/public_html/static/Ornithopter ~/public_html/dist/static
cp -r ~/public_html/static/RoboticKnight ~/public_html/dist/static
