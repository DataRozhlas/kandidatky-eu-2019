d3.csv("https://data.irozhlas.cz/kandidatky-eu-2019/data/app/strany.csv", function(data) {

	var strany = data;
  var idStran = strany.map(function(d) {
    return d['StranaNr'];
  });

  var stranyBezId = strany.map(function(d) {
    delete(d['StranaNr'])
    return (d);
  });

	var html = '<div id = "kandStrany"><h3>Kandidující strany</h3></div>'
	html += '<table id="tabulkaStran" class="display" style="width:100%"></table>'

	document.getElementById("strany").innerHTML = html;

	poskladejTabulkuStran(stranyBezId, idStran);

  $(function() {
    $('#tabulkaStran').DataTable({
        columnDefs: [
          { targets: 0, type: 'diacritics-neutralise' }
        ],
        "order": [[ 0, "asc" ]],
        "responsive": true,
        "ordering": true,
        "paging": false,
        "bInfo": false,
        "language": {
            "url": "https://interaktivni.rozhlas.cz/tools/datatables/Czech.json"
        }
    });
  });
});

function ukazKandidaty(idStrany, nazevStrany) {
  document.getElementById("kandidati").innerHTML = 'Načítám data...'

  d3.csv("https://data.irozhlas.cz/kandidatky-eu-2019/data/app/kandidati.csv", function(data){
  var kandidati = data;

  var kandidatiBezId = kandidati.map(function(d) {
    if (d['StranaNr'] == idStrany) {
      delete(d['StranaNr'])
      return (d);
    };
  });

  kandidatiBezId = kandidatiBezId.filter(function(d) {
    return d != undefined;
  });

  var html = '<div id = "zpetStrany"><button type = "button" onclick = "zpetStrany()">Zpět na výběr strany</button></div>'
  html += '<h3>Kandidáti</h3>'
  html += '<h3 style = "font-weight: normal">' + nazevStrany + '</h3>'
  html += '<table id="tabulkaKandidatu" class="display" style="width:100%"></table>'

  document.getElementById("kandidati").innerHTML = html;

  poskladejTabulkuKandidatu(kandidatiBezId, nazevStrany);

  $(function() {
    $('#tabulkaKandidatu').DataTable({
        columnDefs: [
          { targets: 1, type: 'diacritics-neutralise' }
        ],
        "order": [[ 0, "asc" ]],
        "responsive": true,
        "ordering": true,
        "paging": false,
        "bInfo": false,
        "language": {
          "url": "https://interaktivni.rozhlas.cz/tools/datatables/Czech.json"
        },
    });
  });

  document.getElementById("zpetStrany").scrollIntoView();
  window.scrollBy(0, -50);

  })
};

function zpetStrany() {
  document.getElementById("kandStrany").scrollIntoView();
  window.scrollBy(0, -50);
}

function poskladejTabulkuStran(seznamStran, idStran, idObce) {
  var columns = poskladejHlavickuStran(seznamStran);

  $('#tabulkaStran').append('<tbody>');
  for (var i = 0; i < seznamStran.length; i++) {
    var row$ = $('<tr/>');
    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
      var cellValue = seznamStran[i][columns[colIndex]];
      var nazevStrany = '\'' + seznamStran[i]['Strana'] + '\'';
      if (colIndex == 0) cellValue = cellValue + '<p class="stranaKlik" onclick="ukazKandidaty(' + idStran[i] + ', ' + nazevStrany + ')"><u>kandidáti</u></p>';
      if (cellValue == null) cellValue = "";
      row$.append($('<td/>').html(cellValue));
    }
    $('#tabulkaStran').append(row$);
  }
};

function poskladejHlavickuStran(seznamStran) {
  var columnSet = [];

  $('#tabulkaStran').append('<thead id="seznamStranHlavicka">');
  var headerTr$ = $('<tr>');

  for (var i = 0; i < seznamStran.length; i++) {
    var rowHash = seznamStran[i];
    for (var key in rowHash) {
      if ($.inArray(key, columnSet) == -1) {
        columnSet.push(key);
        headerTr$.append($('<th/>').html(key));
      }
    }
  }

  $('#seznamStranHlavicka').append(headerTr$);

  return columnSet;
}

function poskladejTabulkuKandidatu(seznamKandidatu, nazevStrany) {
  var columns = poskladejHlavickuKandidatu(seznamKandidatu);

  $('#tabulkaKandidatu').append('<tbody>');
  for (var i = 0; i < seznamKandidatu.length; i++) {
    if ((seznamKandidatu[i]['Minulá kandidatura'] != nazevStrany) && (seznamKandidatu[i]['Minulá kandidatura'] != '')) {
      var row$ = $('<tr id = "prebehlik">');
    } else {
      var row$ = $('<tr>');
    }
    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
      var cellValue = seznamKandidatu[i][columns[colIndex]];
      if (cellValue == null) cellValue = "";
      row$.append($('<td>').html(cellValue));
    }
    $('#tabulkaKandidatu').append(row$);
  }
}

function poskladejHlavickuKandidatu(seznamKandidatu) {
  var columnSet = [];

  $('#tabulkaKandidatu').append('<thead id="seznamKandidatuHlavicka">');
  var headerTr$ = $('<tr>');

  for (var i = 0; i < seznamKandidatu.length; i++) {
    var rowHash = seznamKandidatu[i];
    for (var key in rowHash) {
      if ($.inArray(key, columnSet) == -1) {
        columnSet.push(key);
        headerTr$.append($('<th/>').html(key));
      }
    }
  }

  $('#seznamKandidatuHlavicka').append(headerTr$);
  return columnSet;
}

