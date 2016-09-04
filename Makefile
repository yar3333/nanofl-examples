DST = $(shell /bin/find . -maxdepth 1 -mindepth 1 -type d -not \( -path "*.release" -o -path "*-flash" -o -path './.*' \) -printf '%p.release\n')

build: $(DST)

rebuild: clean build

clean:
	rm -rf $(DST)

%.release:
	../ide/standalone/nanoflc.exe $(basename $@)/$(basename $@).nfl -publish
