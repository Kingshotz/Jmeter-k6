@echo off
cd /d "%~dp0"
if not defined JMETER_HOME set "JMETER_HOME=C:\Program Files\apache-jmeter-5.6.3"
if exist results.jtl del results.jtl
if exist html-report rmdir /s /q html-report
@echo on
"%JMETER_HOME%\bin\jmeter.bat" -n -t demowebshop-giftcard-checkout.jmx -l results.jtl -j jmeter.log -Jjmeter.save.saveservice.subresults=false -e -o html-report
