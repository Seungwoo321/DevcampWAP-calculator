

(function(){

	var signContainer = document.getElementById('signContainer');
	var txtButtons = ['7', '8', '9', '&#47;', '&#11178;', '&#10062;','4', '5', '6', '&#42;', '&#40;', '&#41;', '1', '2', '3', '&#45;', '&#94;', '&#8730;', '0', '&#46;', '&#37;', '&#43;', '&#61;'];

	for (var i=0;i<txtButtons.length;i++){
		var div = document.createElement('div');
		div.setAttribute('class','calculator-sign');

		var button = document.createElement('button');
		button.setAttribute('value',txtButtons[i]);
		if (i==txtButtons.length-1){

			div.style.width = '32%';
			button.setAttribute('style', 'background-color:#4CAF50;');


			var span = document.createElement('span');
			span.setAttribute('style','color:#ffffff');
			span.innerHTML = txtButtons[i];


			button.append(span);
		}else{
			button.innerHTML = txtButtons[i];
		}

		div.append(button);
		signContainer.append(div);

	}
	var signNum = ['7', '8', '9','4', '5', '6','1', '2', '3','0'];
	var signMark = ['&#47;', '&#11178;', '&#10062;', '&#42;', '&#40;', '&#41;', '&#45;', '&#94;', '&#8730;', '&#46;', '&#37;', '&#43;', '&#61;'];
	var numFlag = false;
	var markFlag = false;
	var firstFlag = false;
	var signMarkCnt = 0;

	window.addEventListener('keydown', function(e){
		if (e.keyCode == 13){
			document.querySelectorAll('button')[document.querySelectorAll('button').length-1].click()
		}
	})



	document.querySelectorAll('button').forEach(function(el){


		el.addEventListener('click', function(e){

			var selValue = this.getAttribute('value');
			var txtValue = document.getElementsByTagName('input')[0].value;


			if (!firstFlag){
				console.log(selValue);
				if (signMark.indexOf(selValue)>-1 && selValue != '&#8730;' && !txtValue){
					alert('잘못된입력');

					return;
				}else{
					firstFlag = true;
				}
			}


			if (signNum.indexOf(selValue)>-1 || selValue == '&#46;'){
				numFlag = !numFlag;
				signMarkCnt = 0;
			}
			if (signMark.indexOf(selValue)>-1 && selValue != '&#61;' && selValue != '&#11178;' && selValue != '&#10062;' && selValue != '&#46;' && selValue !='&#94;' && selValue != '&#8730;'){
				signMarkCnt++;
				if (signMarkCnt > 1){
					alert('잘못된입력1');
					return;
				}
				markFlag = !markFlag;
			}

			if (selValue == '&#10062;'){
				//전체지우기
				document.getElementsByTagName('input')[0].value = '';
				document.getElementsByClassName('calculator-result')[0].innerHTML = '';
			}else if (selValue == '&#11178;'){
				//한칸 지우기
				document.getElementsByTagName('input')[0].value = document.getElementsByTagName('input')[0].value.slice(0,-1);
			}else if (selValue == '&#61;'){
				//계산하기
				try{


					if (txtValue.charAt(txtValue.length-1) == '^'){
						var fun = document.getElementsByTagName('input')[0].value.slice(0,-1) + '*' + document.getElementsByTagName('input')[0].value.slice(0,-1);
						var result = eval(fun)
					}else if (txtValue.charAt(0) == '√'){
						var fun = txtValue;
						var result = Math.sqrt(txtValue.slice(1,-1));
					}else{
						var fun = document.getElementsByTagName('input')[0].value
						var result = eval(document.getElementsByTagName('input')[0].value);
					}
					document.getElementsByTagName('input')[0].value = result;
					document.getElementsByClassName('calculator-result')[0].innerHTML += '<div style="display:block;"><span style="float:left;width:70%">'+ fun + '</span> <span style="float:right;width:30%"> = ' + result + '\n'; + '</span></div>'
				}catch(err){
					alert('잘못된입력2');
				}
			}else {
				//인풋 창 업데이트
				document.getElementsByTagName('input')[0].value += this.textContent;
			}
		});
	});

/*
var signNum = [
	['7', '8', '9'],
	['4', '5', '6'],
	['1', '2', '3'],
	['0']
];

var signMark = [
	['&#47;', '&#11178;', '&#10062;'],
	['&#42;', '&#40;', '&#41;'],
	['&#45;', '&#94;', '&#8730;'],
	['&#46;', '&#37;', '&#43;', '&#61;']
];
*/
}());
