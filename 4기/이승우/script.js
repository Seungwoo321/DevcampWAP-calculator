

(function(){

	//drawing
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

	var signData = {
		signNum : ['7', '8', '9','4', '5', '6','1', '2', '3','0'],
		signMark : ['&#11178;', '&#10062;','&#61;'], // 중복 입력 가능
		signFun : ['&#47;', '&#42;', '&#40;', '&#41;', '&#45;', '&#94;', '&#8730;', '&#46;', '&#37;', '&#43;']		
	}
	var overFlag = false;
	var firstFlag = false;
	var signMarkCnt = 0;

	// 엔터 이벤트
	window.addEventListener('keydown', function(e){
		if (e.keyCode == 13){
			document.querySelectorAll('button')[document.querySelectorAll('button').length-1].click()
		}
	})


	function doneInputDelete(){
		document.getElementsByTagName('input')[0].value = document.getElementsByTagName('input')[0].value.slice(0,-1);
	}

	function doneScreenClear(){
		document.getElementsByTagName('input')[0].value = '';
		document.getElementsByClassName('calculator-result')[0].innerHTML = '';
		firstFlag = false;
	}

	function checkFirstInput(selValue){
		if (signData.signNum.indexOf(selValue)>-1 || signData.signMark.indexOf(selValue)>-1 || selValue == '&#8730;' || selValue == '&#40;'){
			firstFlag = true;
			return true;
		}else{
			alert('잘못된입력1');
			return false;
		}
	}

	function checkOverSignInput(selValue){
		if (signData.signFun.indexOf(selValue)>-1 && (selValue != '&#40;' || selValue != '&#41;')){
			signMarkCnt++;
			if (signMarkCnt > 1){
				alert('잘못된입력2');
				return false;
			}else{
				return true;
			}
		}else{
			signMarkCnt = 0;
			return true;
		}
	}

	function doneCalculation(txtValue){
		if (txtValue == ""){
			console.log('입력없음');
			return
		}
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
			signMarkCnt = 0;
			document.getElementsByTagName('input')[0].value = result;
			document.getElementsByClassName('calculator-result')[0].innerHTML += '<div style="display:block;"><span style="float:left;width:70%">'+ fun + '</span> <span style="float:right;width:30%"> = ' + result + '\n'; + '</span></div>'
		}catch(err){
			doneScreenClear();
			alert('잘못된입력3');
		}
	}

	document.querySelectorAll('button').forEach(function(el){

		el.addEventListener('click', function(e){

			var selValue = this.getAttribute('value');
			var txtValue = document.getElementsByTagName('input')[0].value;
			var lastValue = txtValue.charAt(txtValue.length-1);
			var lastPreValue = txtValue.charAt(txtValue.length-2);
			// 전체지우기
			if (selValue == '&#10062;'){
				doneScreenClear(selValue);
				return;
			}
			// 한칸 지우기
			if (selValue == '&#11178;'){
				doneInputDelete(selValue);
				return;
			}
			// 첫번째 입력값 체크
			if (!firstFlag){
				var firstInputFlag = checkFirstInput(selValue);
				if (!firstInputFlag){
					return;
				}
			}
			// 중복 연산 입력 체크
			var overFlag = checkOverSignInput(selValue);
			if (!overFlag){
				return;
			}

			// 연산
			if (selValue == '&#61;'){
				doneCalculation(txtValue);
			}else {
				//인풋 창 업데이트
				document.getElementsByTagName('input')[0].value += this.textContent;
			}
		});
	});
}());
