DST = $(shell /bin/find . -maxdepth 1 -mindepth 1 -type d -not \( -path "*.release" -o -path "./WaterLogic-flash" -o -path './.*' \) -printf '%p.release\n')

build: $(DST)

rebuild: clean build

clean:
	rm -rf $(DST)

%.release:
	if [ -f $(basename $@)/$(basename $@).nfl ]; then \
		../ide/standalone/nanoflc.exe $(basename $@)/$(basename $@).nfl -publish ;\
	fi
	
	if [ -f $(basename $@)/$(basename $@).xfl ]; then \
		../ide/standalone/nanoflc.exe $(basename $@)/$(basename $@).xfl -publish ;\
	fi
