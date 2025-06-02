@echo off
cd /d "c:\Users\23011291\Desktop\C240\Lesson 13"
echo Starting ShoreSquad on localhost:3000...
npx http-server -p 3000 -c-1 --cors
pause
