const fs = require("fs");
const LIB = (require("./lib.js")).GameDB;

function main() {
	var GameDB = new LIB;
	var output = "Calculations were made with few assumptions:";
	output += "\r\n	• extra prism/items/money from events/whaling is not gonna be taken into consideration";
	output += "\r\n	• all calculations imply of using 30 prism stages";
	output += "\r\n	• ascend items farming is ignored";
	output += "\r\n------------------------------------------------------------------";



	output += "\r\n 			Your warehouse";
	output += "\r\nNightium: " + BeautyNum(GameDB.warehouse.nightium);
	output += "\r\nSublime: " + BeautyNum(GameDB.warehouse.sublime);
	for (var key in GameDB.warehouse.jaspers) {
		var jasper = GameDB.warehouse.jaspers[key];
		output += "\r\n" + key + " " + BeautyNum(convertIntoJasper(jasper)["blue"]) + " Jasper II";
		output += "\r\n" + key + " " + BeautyNum(convertIntoJasper(jasper)["green"]) + " Jasper I";
		output += "\r\n";
	}
	output += "\r\n------------------------------------------------------------------";



	output += "\r\n 			Total cost of upgrading";
	output += "\r\nNightium: " + BeautyNum(GameDB.totalMoney());
	output += "\r\nSublime: " + BeautyNum(GameDB.totalSublime());
	var buff = GameDB.totalXP();
	for (var key in buff) {
		if (buff[key] == 0) continue;
		output += "\r\n" + key + " " + BeautyNum(convertIntoJasper(buff[key])["blue"]) + " Jasper II";
		output += "\r\n" + key + " " + BeautyNum(convertIntoJasper(buff[key])["green"]) + " Jasper I";
		output += "\r\n";
	}

	var buff2 = GameDB.countPrism();
	output += "\r\nTotal of " + BeautyNum(Math.ceil(buff2)) + " prism";
	output += " = " + BeautyNum(Math.ceil(buff2/(240+225.36))) + " day(s)";




	var buff2 = [];
	output += "\r\n\r\n\r\n 			Remaining cost";
	if (GameDB.totalMoney() > GameDB.warehouse.nightium) {
		buff2.push(GameDB.totalMoney()-GameDB.warehouse.nightium);
		output += "\r\nNightium: " + BeautyNum(buff2[0]);
	} else {
		buff2.push(0);
	}
	if (GameDB.totalSublime() > GameDB.warehouse.sublime) {
		buff2.push(GameDB.totalSublime()-GameDB.warehouse.sublime);
		output +="\r\nSublime: " + BeautyNum(buff2[1]);
	} else {
		buff2.push(0);
	}
	buff2.push(0);
	for (var key in buff) {
		if (buff[key] < GameDB.warehouse.jaspers[key] || buff[key] == 0) continue;
		var xp = buff[key]-GameDB.warehouse.jaspers[key];
		buff2[2] += xp;
		output += "\r\n" + key + " "; 
		output += BeautyNum(convertIntoJasper(xp)["blue"]) + " Jasper II";
		output += "\r\n" + key + " ";
		output += BeautyNum(convertIntoJasper(xp)["green"]) + " Jasper I";
		output += "\r\n";
	}

	buff2 = GameDB.countPrism2(buff2);
	output += "\r\nTotal of " + BeautyNum(Math.ceil(buff2)) + " prism";
	output += " = " + BeautyNum(Math.ceil(buff2/(240+235.36))) + " day(s)";
	output += "\r\n\r\n------------------------------------------------------------------";



	output += "\r\n 			Stats per character"
	for (key in GameDB.characters) {
		var shrt = GameDB.characters[key]; // short
		output += "\r\n\r\n" + key;
		output += "  [" + shrt.stars + "*, " + shrt.element + "]";
		output += "\r\n  |Level: " + shrt.level;
		output += ((shrt.level!=shrt.targetLvl)?" -> " + shrt.targetLvl:"");
		output += "\r\n  |Equipment: " + shrt.equipment;
		output += ((shrt.equipment!=shrt.targetEquipment)?" -> " + shrt.targetEquipment:"");

		if (shrt.EXmoney == 0) continue;
		output += "\r\n  |";
		output += "\r\n  |-------Need------";
		output += "\r\n  |[XP]";
		output += "\r\n  |Total of " + BeautyNum(shrt.EXxp) + " xp";
		output += "\r\n  |" + BeautyNum(convertIntoJasper(shrt.EXxp)["blue"]) + " Jasper II and ";
		output += BeautyNum(convertIntoJasper(shrt.EXxp)["green"]) + " Jasper I";
		if (convertIntoJasper(shrt.EXxp)["wasted"] != 0) {
			output += " (" + BeautyNum(convertIntoJasper(shrt.EXxp)["wasted"]) + "xp extra)";
		}
		if (shrt.EXsublime != 0) {
			output += "\r\n  |";
			output += "\r\n  |[Equipment]";
			output += "\r\n  |Total of " + BeautyNum(shrt.EXsublime) + " sublime";
		}

		output += "\r\n  |";
		output += "\r\n  |[Nightium] ";
		output += "\r\n  |Total of " + BeautyNum(shrt.EXmoney) + " nightium";
	}


	output += "\r\n------------------------------------------------------------------";
	output += "\r\n 			Resources wasted";
	GameDB.alredySpentResources()
	output += "\r\nNightium: " + BeautyNum(GameDB.totalMoney());
	output += "\r\nSublime: " + BeautyNum(GameDB.totalSublime());
	var buff = GameDB.totalXP();
	for (var key in buff) {
		if (buff[key] == 0) continue;
		output += "\r\n" + key + " " + BeautyNum(convertIntoJasper(buff[key])["blue"]) + " Jasper II";
		output += "\r\n" + key + " " + BeautyNum(convertIntoJasper(buff[key])["green"]) + " Jasper I";
		output += "\r\n";
	}

	var buff2 = GameDB.countPrism();
	output += "\r\nTotal of " + BeautyNum(Math.ceil(buff2)) + " prism";
	output += " = " + BeautyNum(Math.ceil(buff2/(240+225.36))) + " day(s)";


	if (GameDB.settings.outputToConsole) console.log(output);
	fs.writeFile("./results.txt", output, function(err){});
	return;
}

function convertIntoJasper(INxp) {
	var output = {}; 
	output["blue"] =((INxp-INxp%750)/750);
	var buff = INxp - output["blue"]*750;
	output["green"] = Math.ceil(buff/150);
	output["wasted"] = Math.abs(INxp-output["blue"]*750-output["green"]*150);
	return output;
}

function BeautyNum(num) {
	num = "" + num;
	for (var i=num.length-1, j=1;i>0;i--, j++) {
		if (j == 3 && num[i-1] != "-") {
			num = num.slice(0, i) + "," + num.slice(i);
			j=0;
		}
	}
	return num;
}

main();