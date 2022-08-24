# Alchemy Stars eStimated

Alchemy Stars eStimated, or ASS for short, is a simple planner for character upgrading in the gacha game "Alchemy Stars".


## Installation for Windows

1. Download and install latest stable [Node.js](https://nodejs.org/).
2. Download latest ASS [release](https://github.com/NullyTime/Alchemy-Stars-eStimated/releases) and unpack it in any folder.
3. Rename `templateBelongings.json` to `Belongings.json` and edit it with your data.
4. Open console in that folder and run `node main.js`.
5. Results will be in console (if `outputToConsole` is set to "true") and in results.txt file.

## Installation for Android
1. Download and install [Termux](https://github.com/termux/termux-app)
2. Open app and write few commands:
- `pkg update` (write "y" when program will ask you to)
- `pkg install nodejs`
- `pkg install wget`
- `wget https://github.com/NullyTime/Alchemy-Stars-eStimated/archive/refs/tags/stable.zip`
- `unzip Alchemy-Stars-eStimated-stable.zip`
3. Use standard Android file manager (such as `Files`), go to Termux/Alchemy-Stars-eStimated-stable folder and copy `templateBelongings.json` file to `Downloads`.
4. Rename `templateBelongings.json` to `Belongings.json`, edit it with your data and copy to `Termux/Alchemy-Stars-eStimated-stable` folder.
5. Open Termux app again and run: 
- `cd Alchemy-Stars-eStimated-stable`
- `node main.js`.
6. Copy `results.txt` file into `Downloads` and read. 

## License
GPL-3.0 