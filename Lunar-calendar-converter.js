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
)
