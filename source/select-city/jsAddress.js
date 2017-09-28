/**
 * ShenBao
 * shenbao.china@gmail.com
 */

var addressInit = function (provinceList, _cmbProvince, _cmbCity, _cmbArea, defaultProvince, defaultCity, defaultArea) {
    var cmbProvince = document.getElementById(_cmbProvince);
    var cmbCity = document.getElementById(_cmbCity);
    var cmbArea = document.getElementById(_cmbArea);

    function cmbSelect(cmb, str) {
        for (var i = 0; i < cmb.options.length; i++) {
            if (cmb.options[i].value == str) {
                cmb.selectedIndex = i;
                return;
            }
        }
    }
    function cmbAddOption(cmb, obj) {
        var option = document.createElement("OPTION");
        cmb.options.add(option);
        option.innerText = obj.name;
        option.value = obj.id;
        option.obj = obj;
    }

    function changeCity() {
        cmbArea.options.length = 0;
        if (cmbCity.selectedIndex == -1) return;
        var item = cmbCity.options[cmbCity.selectedIndex].obj;
        for (var i = 0; i < item.areaList.length; i++) {
            cmbAddOption(cmbArea, item.areaList[i]);
        }
        cmbSelect(cmbArea, defaultArea);
    }
    function changeProvince() {
        cmbCity.options.length = 0;
        cmbCity.onchange = null;
        if (cmbProvince.selectedIndex == -1) return;
        var item = cmbProvince.options[cmbProvince.selectedIndex].obj;
        for (var i = 0; i < item.cityList.length; i++) {
            cmbAddOption(cmbCity, item.cityList[i]);
        }
        cmbSelect(cmbCity, defaultCity);
        changeCity();
        cmbCity.onchange = changeCity;
    }

    for (var i = 0; i < provinceList.length; i++) {
        cmbAddOption(cmbProvince, provinceList[i]);
    }
    cmbSelect(cmbProvince, defaultProvince);
    changeProvince();
    cmbProvince.onchange = changeProvince;
}  