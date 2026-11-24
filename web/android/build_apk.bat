@echo off
set "JAVA_HOME=D:\Project_Software\nodejs\Git\New folder\jbr"
set "PATH=%JAVA_HOME%\bin;%PATH%"
cd /d "F:\Power_Pulse_SJ\latest\Power-Pulse-main\web\android"
call gradlew.bat assembleDebug
