@echo off
echo ===================================
echo Iniciando deploy do sistema de salao
echo ===================================

:: Verifica se o Java esta instalado
java -version
if errorlevel 1 (
    echo Erro: Java nao encontrado!
    echo Por favor, instale o Java 11 ou superior.
    exit /b 1
)

:: Verifica se o Maven esta instalado
mvn -v
if errorlevel 1 (
    echo Erro: Maven nao encontrado!
    echo Por favor, instale o Maven 3.6 ou superior.
    exit /b 1
)

echo.
echo Compilando o projeto...
call mvn clean package
if errorlevel 1 (
    echo Erro durante a compilacao!
    exit /b 1
)

echo.
echo Verificando se a aplicacao anterior esta rodando...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":8080"') do (
    echo Encerrando processo anterior: %%a
    taskkill /F /PID %%a
)

echo.
echo Iniciando a aplicacao...
start javaw -jar target/salao-0.0.1-SNAPSHOT.jar

echo.
echo Aguardando a aplicacao iniciar...
timeout /t 10 /nobreak

echo.
echo Deploy concluido!
echo A aplicacao esta disponivel em http://localhost:8080
echo.

pause
