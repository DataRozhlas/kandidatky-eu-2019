/* eslint-disable no-undef */
import Papa from "papaparse";

const partaj = "Volte Pravý Blok - stranu za snadnou a rychlou ODVOLATELNOST politiků a státních úředníků PŘÍMO OBČANY, za NÍZKÉ daně, VYROVNANÝ rozpočet, MINIMALIZACI byrokracie, SPRAVEDLIVOU a NEZKORUMPOVANOU policii a justici, REFERENDA a PŘÍMOU demokracii WWW.CIBULKA.NET, kandidující s nejlepším protikriminálním programem PŘÍMÉ demokracie a hlubokého národního, duchovního a mravního obrození VY NEVĚŘÍTE POLITIKŮM A JEJICH NOVINÁŘŮM? NO KONEČNĚ! VĚŘME SAMI SOBĚ!!! - ale i s mnoha dalšími DŮVODY, proč bychom měli jít tentokrát VŠICHNI K VOLBÁM, ale - pokud nechceme být ZNOVU obelháni, podvedeni a okradeni - NEVOLIT ŽÁDNOU PARLAMENTNÍ TUNEL - STRANU vládnoucí (post) komunistické RUSKO - ČESKÉ totalitní FÍZLOKRACIE a jejich likvidační protinárodní politiku ČÍM HŮŘE, TÍM LÉPE!!! - jenž žádá o volební podporu VŠECHNY ČESKÉ OBČANY a daňové poplatníky, kteří chtějí změnit dnešní kriminální poměry, jejichž jsme všichni obětí, v jejich pravý opak! V BOJI MEZI DOBREM A ZLEM, PRAVDOU A LŽÍ, NELZE BÝT NEUTRÁLNÍ A PŘESTO ZŮSTAT SLUŠNÝ!!! Proto děkujeme za Vaši podporu!!! Nevěříte-li na pokoru u popravčí káry, zdá-li se vám naše kandidátka málo dokonalá nebo postrádáte-li na ní zástupce své obce nebo města a přitom MÁTE ODVAHU v této válce Lidí Dobra s vládnoucími Lidmi Zla povstat z jimi naordinovaného občanského bezvědomí, kterým nás ničí a dnešní DEMOKRATURU, SKRYTOU TOTALITU a OTROKÁŘSTVÍ VYŠŠÍHO ŘÁDU zásadním způsobem změnit, KANDIDUJTE ZA NÁS!!! Kontakt: Volte Pravý Blok www.cibulka.net, PO BOX 229, 11121 Praha";

document
  .getElementById("longer")
  .addEventListener("click", () => {
    document.getElementById("cibulkator").innerHTML = `<i>${partaj}</i>`;
  });

// tabulka stran
Papa.parse("https://data.irozhlas.cz/kandidatky-eu-2019/data/app/strany.csv", {
  download: true,
  skipEmptyLines: true,
  complete(results) {
    const strany = results.data;

    // hlavicka
    const hlavicka = $("<thead>");
    const hlavickaTr = $("<tr>");
    strany[0].map(column => hlavickaTr.append($("<th>").html(column)));
    $(hlavicka).append(hlavickaTr);
    $("#tabulkaStran").append(hlavicka);

    // telo
    const telo = $("<tbody>");
    strany.slice(1).forEach((strana) => {
      const radek = $("<tr>");
      strana.forEach((column, index) => {
        index === 0
          ? radek.append($("<td>").html(`${column} <p class="stranaKlik" data-strana=${column}><u>kandidáti</u></p>`))
          : radek.append($("<td>").html(column));
      });
      $(telo).append(radek);
    });
    $("#tabulkaStran").append(telo);

    $("#tabulkaStran").DataTable({
      order: [[0, "asc"]],
      responsive: true,
      ordering: true,
      paging: false,
      language: {
        url: "https://interaktivni.rozhlas.cz/tools/datatables/Czech.json",
      },
      columnDefs: [
        {
          targets: 7,
          visible: false,
          searchable: false,
        },
      ],
    });

    $(".stranaKlik").click((e) => {
      const strana = e.currentTarget.getAttribute("data-strana");
      const nazevStrany = strany.filter(str => str[0] === strana)[0][1];

      document.getElementById("kandidati").innerHTML = "Načítám data...";

      Papa.parse("https://data.irozhlas.cz/kandidatky-eu-2019/data/app/kandidati.csv", {
        download: true,
        skipEmptyLines: true,
        complete(kandResults) {
          const kandidati = kandResults.data
            .filter(kand => kand[0] === parseInt(strana, 10).toString());

          document
            .getElementById("kandidati")
            .innerHTML = `<button id="zpetStrany" type="button">Zpět na výběr strany</button>
              <h3>Kandidáti</h3>
              <h3 style="font-weight: normal">${nazevStrany}</h3>
              <table id="tabulkaKandidatu" class="display" style="width:100%"></table>`;

          // hlavicka
          const kandHlavicka = $("<thead>");
          const kandHlavickaTr = $("<tr>");
          kandResults.data[0].map(column => kandHlavickaTr.append($("<th>").html(column)));
          $(kandHlavicka).append(kandHlavickaTr);
          $("#tabulkaKandidatu").append(kandHlavicka);

          // telo
          const kandTelo = $("<tbody>");
          kandidati.forEach((kandidat) => {
            const radek = $("<tr>");
            kandidat.forEach((column) => {
              radek.append($("<td>").html(column));
            });
            $(kandTelo).append(radek);
          });
          $("#tabulkaKandidatu").append(kandTelo);

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


          document.getElementById("zpetStrany").scrollIntoView();
          window.scrollBy(0, -50);

          $("#zpetStrany").click(() => {
            document.getElementById("kandStrany").scrollIntoView();
            window.scrollBy(0, -50);
          });
        },
      });
    });
  },
});
