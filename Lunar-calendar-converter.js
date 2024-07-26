(function convertSolarToLunar()
{
var dd, mm, yy, sd, ld;
dd = document.getElementById("S_DD").value-0;
mm = document.getElementById("S_MM").value-0;
yy = document.getElementById("S_YY").value-0;

ld = getLunarDate(dd, mm, yy);
sd = jdn2date(ld.jd);

updateValues(sd, ld);
}

function computeYearCanChi() {
	var yy = document.getElementById("L_YY").value-0;
	document.getElementById("L_CC").value = getYearCanChi(yy);
}

function convertLunarToSolar()
{
	var dd, mm, yy, sd, ld;
	dd = document.getElementById("L_DD").value-0;
	mm = document.getElementById("L_MM").value-0;
	yy = document.getElementById("L_YY").value-0;

	sd = getSolarDate(dd, mm, yy);
	ld = getLunarDate(sd[0], sd[1], sd[2]);
	updateValues(sd, ld);
}

function showToday() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yy = today.getFullYear();
	var sd = new Array(dd, mm, yy);
	var ld = getLunarDate(dd, mm, yy);
	updateValues(sd, ld);
}

function updateValues(sd, ld) {
	document.getElementById("S_DD").selectedIndex = sd[0]-1;
	document.getElementById("S_MM").selectedIndex = sd[1]-1;
	document.getElementById("S_YY").value = sd[2];

	document.getElementById("L_DD").selectedIndex = ld.day-1;
	document.getElementById("L_MM").selectedIndex = ld.month-1;
	document.getElementById("L_YY").value = ld.year;
	document.getElementById("L_CC").innerHTML = getYearCanChi(ld.year);
	if (ld.leap == 1) {
		document.getElementById("L_LL").innerHTML = "nhu\u1EADn";
	} else {
		document.getElementById("L_LL").innerHTML = "";
	}
	document.getElementById("L2SButton").value = 'Đổi ngày '+ld.day+'/'+ld.month+' âm sang ngày dương cho 20 năm '+ld.year+'-'+(ld.year+19);
}

function computeSolarDates() {
	var res = "";
	var dd, mm, yy, sd, ld, i, cls, thu;
	dd = document.getElementById("L_DD").value-0;
	mm = document.getElementById("L_MM").value-0;
	yy = document.getElementById("L_YY").value-0;
	res += '<table border="1">';
	res += '<tr><th>Ngày âm</th><th>Ngày d&#x1B0;&#x1A1;ng</th></tr>';
	for (i=0; i<20; i++) {
		sd = getSolarDate(dd, mm, yy+i);
		ld = getLunarDate(sd[0], sd[1], sd[2]);
		if (ld.day != dd && dd == 30) {
			sd = jdn2date(ld.jd-1);
			ld = getLunarDate(sd[0], sd[1], sd[2]);
		}
		cls = (i % 2 == 0) ? "even" : "odd";
		thu = (ld.jd+1) % 7;
		res += '<tr class="'+cls+'"><td>'+ld.day+'/'+ld.month+' '+getYearCanChi(ld.year)+'</td>\n';
		res += '<td>'+TUAN[thu] + ' ' + sd[0]+'/'+sd[1]+'/'+sd[2]+'</td></tr>\n';
	}
	res += '</table>';
	document.getElementById("conversion_result").innerHTML = res;
}
function YearlyEvent(dd, mm, info) {
	this.day = dd;
	this.month = mm;
	this.info = info;
}


function findEvents(dd, mm) {
	var ret = new Array();
	for (var i = 0; i < LE.length; i++) {
		evt = LE[i];
		if (evt.day == dd && evt.month == mm) {
			ret.push(evt);
		}
	}
	return ret;
}

function getDayInfo(dd, mm) {
	var events = findEvents(dd, mm);
	var ret = '';
	for (var i = 0; i < events.length; i++) {
		ret += events[i].info+' ';
	}
	ret += '&nbsp;';
	return ret;
}

function showDayInfo(cellId, dd, mm, yy, leap, length, jd, sday, smonth, syear) {
	selectCell(cellId);
	//alert('Cell '+cellId+': '+dd+'/'+mm+'/'+yy+" AL = "+sday+"/"+smonth+"/"+syear);
	document.NaviForm.dd.value = sday;
	//document.getElementById("thangduong").innerHTML = 'ThÃ¡ng '+smonth+' nÄƒm '+syear;
	document.getElementById("ngayduong").innerHTML = sday;
	var dayOfWeek = TUAN[(jd + 1) % 7];
	document.getElementById("thuduong").innerHTML = dayOfWeek;
	document.getElementById("ngayam").innerHTML = dd;
	var nhuan = (leap == 1) ? ' nhu\u1EADn' : '';
	var tenthang = 'Th\u00E1ng '+THANG[mm-1]+nhuan+(length == 30 ? ' (\u0110)' : ' (T)');
	document.getElementById("thangam").innerHTML = tenthang;
	document.getElementById("namam").innerHTML = 'N\u0103m '+getYearCanChi(yy);
	var thang = CAN[(yy*12+mm+3) % 10] + " " + CHI[(mm+1)%12];
	document.getElementById("canchithang").innerHTML = 'Th\u00E1ng '+thang;
	var ngay = CAN[(jd + 9) % 10] + " " + CHI[(jd+1)%12];
	document.getElementById("canchingay").innerHTML = 'Ng\u00E0y '+ngay;
	document.getElementById("canchigio").innerHTML = 'Gi\u1EDD '+getCanHour0(jd)+' '+CHI[0];
	document.getElementById("tietkhi").innerHTML = 'Ti\u1EBFt '+TIETKHI[getSolarTerm(jd+1, 7.0)];
	document.getElementById("dayinfo").innerHTML = getDayInfo(dd, mm);
	document.getElementById("hoangdao").innerHTML = 'Gi\u1EDD ho\u00E0ng \u0111\u1EA1o: '+getGioHoangDao(jd);
	//document.NaviForm.submit();
}

function selectCell(cellId) {
	for (var i=0; i<42; i++) {
		document.getElementById("cell"+i).className = 'ngaythang';
	}
	document.getElementById("cell"+cellId).className = 'homnay';
}
)
