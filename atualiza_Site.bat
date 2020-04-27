
#Atualiza repository git
set data=%date:~0,2%/%date:~3,2%/%date:~6,4%
set hora=%time:~0,2%:%time:~3,2%

echo " Texto: %data% %hora%"


cd\
c:\
cd sitePiloto
cd win2tech
git init
git add *
git commit -m "update Projeto %data% %hora%" 

git push origin master

pause