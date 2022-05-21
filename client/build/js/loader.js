

    var e = document.querySelector("#progress");
    const pageloader =  document.getElementById('pageloader')
		var percent = document.querySelector("#progress-percent");
		var width = 0;
		var id = setInterval(frame,160);
		function frame(){
			if(width >= 100){
				clearInterval(id)
			}else{
				
				const file = document.getElementById('file')
				let i;
				let files = [
					'Recrutement','Dashboad','Settings',
					'Payment & Salary','leave management',
					'salary management','Recrutement','Dashboad',
					'Settings','Payment & Salary',
					'leave management','salary management',
				];
				width = width+2;
				e.style.width = width+"%";
				percent.innerHTML = width+"%";

				//load text when loading
				for(i=0; i<width;i++){
					files.push(files[i])
					for(let text in files){
						file.innerHTML = files[i]
					}
				}
				
				if(width == 100){
                        setTimeout(()=>{
                            window.location.href="http://localhost:90/web/dashboard"
                        },100)
                   
				}
			}
		}


function loadpage(){
    var e = document.querySelector("#progress2");
    const pageloader =  document.getElementById('pageloader')
		var width = 0;
		var id = setInterval(frame,160);
		function frame(){
			if(width >= 100){
				clearInterval(id)
			}else{
				
				const file = document.getElementById('file')
				let i;
				let files = [
					        'Recrutement','Dashboad','Settings','Payment & Salary','leave management','salary management','Recrutement','Dashboad','Settings','Payment & Salary','leave management','salary management',
				           
			                ]
				width = width+10;
				e.style.width = width+"%";

				//load text when loading
				for(i=0; i<width;i++){
					files.push(files[i])
					for(let text in files){
						file.innerHTML = files[i]
					}
				}
				
				if(width == 100){
                        setTimeout(()=>{
                            pageloader.style.display = "none"
                        },100)
                   
				}
			}
		}
}

loadpage()
