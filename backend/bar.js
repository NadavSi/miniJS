function ValidateEmail_vf(e){return!!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)}function validatePhone_vf(e,n){switch(n=n.replace("-",""),phonelen=n.length,areaCodeLandArr=["01","02","03","04","06","08","09"],areaCodeMobileArr=["05","07"],areaCodePayArr=["1800","1700"],!0){case 0==phonelen:return 0;case phonelen>=1&&phonelen<=8:return-1;case 9==phonelen:return areaCodeLandArr.includes(n.substring(0,2))&&/^\d+$/.test(n)?($("#"+e).val(n.substring(0,2)+"-"+n.substring(2,9)),0):-2;case 10==phonelen:return areaCodeMobileArr.includes(n.substring(0,2))?/^\d+$/.test(n)?($("#"+e).val(n.substring(0,3)+"-"+n.substring(3,10)),0):-2:areaCodePayArr.includes(n.substring(0,4))&&/^\d+$/.test(n)?($("#"+e).val(n.substring(0,1)+"-"+n.substring(1,4)+"-"+n.substring(4,10)),0):-2;default:return-3}}function validateIdentityNumber_vf(e,n){return e=e.replace(/\s/g,""),idLength=e.length,9==idLength?($("#"+n).val(e),!0):8==idLength?($("#"+n).val("0"+e),!0):($("#"+n).val(""),!1)}function validateChip_vf(e){return 15==e.length&&!/\D/.test(e)}