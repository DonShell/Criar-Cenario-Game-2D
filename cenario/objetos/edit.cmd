set /p i=apartir de: 

:loop
if exist "%cd%\%i%.png" (
	start mspaint "%cd%\%i%.png"
	set /a i=%i%+1
	echo %i%
	goto loop
)