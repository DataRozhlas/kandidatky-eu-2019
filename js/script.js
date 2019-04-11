/* eslint-disable no-undef */
import Papa from "papaparse";

// prodluzovaci bazmek
function cibulkator() {
  const partaj = "Volte Pravý Blok - stranu za snadnou a rychlou ODVOLATELNOST politiků a státních úředníků PŘÍMO OBČANY, za NÍZKÉ daně, VYROVNANÝ rozpočet, MINIMALIZACI byrokracie, SPRAVEDLIVOU a NEZKORUMPOVANOU policii a justici, REFERENDA a PŘÍMOU demokracii WWW.CIBULKA.NET, kandidující s nejlepším protikriminálním programem PŘÍMÉ demokracie a hlubokého národního, duchovního a mravního obrození VY NEVĚŘÍTE POLITIKŮM A JEJICH NOVINÁŘŮM? NO KONEČNĚ! VĚŘME SAMI SOBĚ!!! - ale i s mnoha dalšími DŮVODY, proč bychom měli jít tentokrát VŠICHNI K VOLBÁM, ale - pokud nechceme být ZNOVU obelháni, podvedeni a okradeni - NEVOLIT ŽÁDNOU PARLAMENTNÍ TUNEL - STRANU vládnoucí (post) komunistické RUSKO - ČESKÉ totalitní FÍZLOKRACIE a jejich likvidační protinárodní politiku ČÍM HŮŘE, TÍM LÉPE!!! - jenž žádá o volební podporu VŠECHNY ČESKÉ OBČANY a daňové poplatníky, kteří chtějí změnit dnešní kriminální poměry, jejichž jsme všichni obětí, v jejich pravý opak! V BOJI MEZI DOBREM A ZLEM, PRAVDOU A LŽÍ, NELZE BÝT NEUTRÁLNÍ A PŘESTO ZŮSTAT SLUŠNÝ!!! Proto děkujeme za Vaši podporu!!! Nevěříte-li na pokoru u popravčí káry, zdá-li se vám naše kandidátka málo dokonalá nebo postrádáte-li na ní zástupce své obce nebo města a přitom MÁTE ODVAHU v této válce Lidí Dobra s vládnoucími Lidmi Zla povstat z jimi naordinovaného občanského bezvědomí, kterým nás ničí a dnešní DEMOKRATURU, SKRYTOU TOTALITU a OTROKÁŘSTVÍ VYŠŠÍHO ŘÁDU zásadním způsobem změnit, KANDIDUJTE ZA NÁS!!! Kontakt: Volte Pravý Blok www.cibulka.net, PO BOX 229, 11121 Praha";

  $("#longer").click(() => $("#cibulkator").html(`<i>${partaj}</i>`));
}

// vyflusnuti tabulek
function drawTables(stranyData, kandData) {
  // strany - hlavicka (prvni radek csv)
  const hlavicka = $("<tr>");
  stranyData[0].forEach(column => hlavicka.append($("<th>").html(column)));
  $("<thead>").appendTo("#tabulkaStran").append(hlavicka);

  // strany - telo (zbytek radku)
  const telo = $("<tbody>");
  stranyData.slice(1).forEach((strana) => {
    const radek = $("<tr>");
    strana.forEach((column, index) => {
      index === 1
        ? radek.append($("<td>").html(`${column} <div class="stranaKlik" data-strana=${strana[0]}><u>kandidáti</u></div>`))
        : radek.append($("<td>").html(column));
    });

    // skryty sloupecek se jmeny kandidatu kvuli searchi
    const kandidati = kandData
      .filter(kand => kand[0] === parseInt(strana[0], 10).toString())
      .map(kand => kand[2]);
    radek.append($("<td>").html(kandidati.join(" ")));

    $(telo).append(radek);
  });
  $("#tabulkaStran").append(telo);

  // strany - datatablizace
  $("#tabulkaStran").DataTable({
    order: [[0, "asc"]],
    responsive: true,
    ordering: true,
    paging: false,
    language: {
      url: "https://interaktivni.rozhlas.cz/tools/datatables/Czech.json",
    },
    columnDefs: [
      { targets: 1, type: "diacritics-neutralise" },
      { targets: 7, visible: false, searchable: false },
      { targets: 8, visible: false },
    ],
  });


  // onclick tabulka kandidatu
  $(".stranaKlik").click((e) => {
    const strana = e.currentTarget.getAttribute("data-strana");
    const nazevStrany = stranyData.filter(str => str[0] === strana)[0][1];

    $("#kandidati").html(`<button id="zpetStrany" type="button">Zpět na výběr strany</button>
      <h3>Kandidáti</h3>
      <h3 style="font-weight: normal">${nazevStrany}</h3>
      <table id="tabulkaKandidatu" class="display" style="width:100%"></table>`);

    // kandidati - hlavicka (prvni radek csv)
    const kandHlavicka = $("<tr>");
    kandData[0].map(column => kandHlavicka.append($("<th>").html(column)));
    $("<thead>").appendTo("#tabulkaKandidatu").append(kandHlavicka);

    // kandidati - telo (filtr podle cisla strany)
    const kandidati = kandData
      .filter(kand => kand[0] === parseInt(strana, 10).toString());

    const kandTelo = $("<tbody>");
    kandidati.forEach((kandidat) => {
      const radek = $("<tr>");
      kandidat.forEach(column => radek.append($("<td>").html(column)));
      $(kandTelo).append(radek);
    });
    $("#tabulkaKandidatu").append(kandTelo);

    // kandidati - datatablizace
    $("#tabulkaKandidatu").DataTable({
      columnDefs: [
        { targets: 1, type: "diacritics-neutralise" },
        { targets: 0, visible: false },
      ],
      order: [[0, "asc"]],
      responsive: true,
      ordering: true,
      paging: false,
      language: {
        url: "https://interaktivni.rozhlas.cz/tools/datatables/Czech.json",
      },
    });

    // scrolling od tlačítka a k němu
    document.getElementById("tabulkaStran_info").scrollIntoView();

    $("#zpetStrany").click(() => {
      document.getElementById("kandStrany").scrollIntoView();
    });
  });
}

// nacteni tabulky kandidatu
function loadKand(stranyData) {
  Papa.parse("https://data.irozhlas.cz/kandidatky-eu-2019/data/app/kandidati.csv", {
    download: true,
    skipEmptyLines: true,
    complete(results) {
      drawTables(stranyData, results.data);
    },
  });
}

// nacteni tabulky stran
function loadStrany() {
  Papa.parse("https://data.irozhlas.cz/kandidatky-eu-2019/data/app/strany.csv", {
    download: true,
    skipEmptyLines: true,
    complete(results) {
      loadKand(results.data);
    },
  });
}

cibulkator();
loadStrany();
