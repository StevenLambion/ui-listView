angular.module("app", ["ui-listView"])
.controller("SampleApp", function ($scope) {
    
    $scope.listViewOptions = {};
    
    $scope.search = {};
    
    $scope.contacts = [
        {
            "name": "Jaquelyn Bush",
            "email": "In.tincidunt@vel.net"
        },
        {
            "name": "Simone Martin",
            "email": "odio.a.purus@Nunc.edu"
        },
        {
            "name": "Darryl Glover",
            "email": "quam.a.felis@magna.net"
        },
        {
            "name": "Bianca Hodge",
            "email": "augue.porttitor@sagittis.com"
        },
        {
            "name": "Phelan Hunter",
            "email": "enim.Sed.nulla@eu.com"
        },
        {
            "name": "McKenzie Robles",
            "email": "ullamcorper.magna@ataugue.net"
        },
        {
            "name": "Lavinia Richard",
            "email": "felis.Donec.tempor@pede.net"
        },
        {
            "name": "Aretha Christian",
            "email": "porttitor@nunc.co.uk"
        },
        {
            "name": "Ashely Gaines",
            "email": "vehicula.et@nibhenimgravida.net"
        },
        {
            "name": "Yen Cortez",
            "email": "massa.Integer@est.co.uk"
        },
        {
            "name": "Christen Ewing",
            "email": "tincidunt.adipiscing.Mauris@ametdapibusid.co.uk"
        },
        {
            "name": "Yoshi Rodriguez",
            "email": "vulputate@tellus.co.uk"
        },
        {
            "name": "Zorita Workman",
            "email": "velit@erategettincidunt.co.uk"
        },
        {
            "name": "Eaton Bennett",
            "email": "Curabitur.ut@atsemmolestie.net"
        },
        {
            "name": "Charissa Wolfe",
            "email": "neque.In@tristique.org"
        },
        {
            "name": "Lee Whitaker",
            "email": "imperdiet.dictum.magna@Duisvolutpatnunc.edu"
        },
        {
            "name": "Savannah Chaney",
            "email": "tincidunt@lacusQuisqueimperdiet.ca"
        },
        {
            "name": "Forrest Herman",
            "email": "ut.odio@facilisismagnatellus.net"
        },
        {
            "name": "Kermit Ferrell",
            "email": "ipsum@magnanecquam.org"
        },
        {
            "name": "Chloe Porter",
            "email": "blandit.at.nisi@orci.com"
        },
        {
            "name": "Lionel May",
            "email": "Cum@neque.edu"
        },
        {
            "name": "Ferdinand Kidd",
            "email": "orci.Ut.semper@Nullatinciduntneque.com"
        },
        {
            "name": "Beverly Hobbs",
            "email": "sem.mollis.dui@Donecporttitor.net"
        },
        {
            "name": "Lacota Merritt",
            "email": "amet.faucibus@Nullam.org"
        },
        {
            "name": "Dustin Hines",
            "email": "ipsum.cursus@nondui.co.uk"
        },
        {
            "name": "Paul Medina",
            "email": "Proin.eget@aclibero.ca"
        },
        {
            "name": "Genevieve Whitley",
            "email": "nisi.sem.semper@dui.org"
        },
        {
            "name": "Reuben Stokes",
            "email": "auctor.Mauris.vel@Pellentesquetincidunttempus.net"
        },
        {
            "name": "Lamar Albert",
            "email": "elit@Pellentesqueultricies.com"
        },
        {
            "name": "Alisa Duncan",
            "email": "sem@Crasconvallis.com"
        },
        {
            "name": "Ebony Barnes",
            "email": "aliquet.libero.Integer@egestas.ca"
        },
        {
            "name": "Gannon Herrera",
            "email": "Sed.nec.metus@tortordictum.co.uk"
        },
        {
            "name": "Xanthus Rivera",
            "email": "molestie.tortor.nibh@eratnonummy.net"
        },
        {
            "name": "Alyssa Sweet",
            "email": "lectus@lacusQuisque.org"
        },
        {
            "name": "Carlos Shannon",
            "email": "Ut.tincidunt.vehicula@tristiquealiquetPhasellus.com"
        },
        {
            "name": "Kennan Mcpherson",
            "email": "nec@ante.co.uk"
        },
        {
            "name": "Naida Gilmore",
            "email": "urna@enim.org"
        },
        {
            "name": "Lysandra Massey",
            "email": "Sed@consequat.edu"
        },
        {
            "name": "Tashya Oneill",
            "email": "ligula.elit.pretium@sagittisfelisDonec.com"
        },
        {
            "name": "Yuri Schneider",
            "email": "lorem.eget.mollis@nec.net"
        },
        {
            "name": "Brady Trevino",
            "email": "habitant.morbi@antelectusconvallis.ca"
        },
        {
            "name": "Beverly Glover",
            "email": "euismod@Sed.co.uk"
        },
        {
            "name": "Shelley Hutchinson",
            "email": "tellus.Suspendisse@enim.ca"
        },
        {
            "name": "Elizabeth Chen",
            "email": "non.cursus.non@rhoncusProin.net"
        },
        {
            "name": "Dorian Kane",
            "email": "fermentum.fermentum@actellus.net"
        },
        {
            "name": "Samantha Chaney",
            "email": "purus.sapien.gravida@molestie.co.uk"
        },
        {
            "name": "Justin Delgado",
            "email": "mi@nonummy.edu"
        },
        {
            "name": "Regan Valdez",
            "email": "porttitor@lectus.com"
        },
        {
            "name": "Sage Clark",
            "email": "Suspendisse.aliquet@erat.net"
        },
        {
            "name": "Remedios Mueller",
            "email": "nonummy.Fusce@Suspendisse.org"
        },
        {
            "name": "Nissim Monroe",
            "email": "velit.eget@semper.com"
        },
        {
            "name": "Dara Benton",
            "email": "Integer.urna.Vivamus@sit.org"
        },
        {
            "name": "Daquan Leon",
            "email": "enim@euismodmauriseu.org"
        },
        {
            "name": "Abel Nixon",
            "email": "nec@consectetuer.net"
        },
        {
            "name": "Sigourney Gross",
            "email": "eleifend.nec@lectusa.net"
        },
        {
            "name": "Wyatt Schmidt",
            "email": "vel@justo.org"
        },
        {
            "name": "Berk Dunlap",
            "email": "quam@lacusQuisque.com"
        },
        {
            "name": "Slade Wallace",
            "email": "Donec@taciti.net"
        },
        {
            "name": "Maggy Farrell",
            "email": "Nunc.sollicitudin@interdumfeugiatSed.edu"
        },
        {
            "name": "Adam Hanson",
            "email": "dictum.sapien@ligulaelit.edu"
        },
        {
            "name": "Ray Obrien",
            "email": "tincidunt.tempus.risus@lectusante.co.uk"
        },
        {
            "name": "Gage Huber",
            "email": "facilisis.vitae.orci@imperdietdictum.co.uk"
        },
        {
            "name": "Paki Osborne",
            "email": "lobortis.augue.scelerisque@augue.edu"
        },
        {
            "name": "Upton Hendricks",
            "email": "Nulla@ultriciessemmagna.edu"
        },
        {
            "name": "Joshua Chavez",
            "email": "commodo.at@Phasellus.co.uk"
        },
        {
            "name": "Quon Klein",
            "email": "adipiscing.lobortis.risus@Sednuncest.ca"
        },
        {
            "name": "Kevin Benjamin",
            "email": "ut@orcilobortis.co.uk"
        },
        {
            "name": "Carolyn Vincent",
            "email": "ac.feugiat@nisl.net"
        },
        {
            "name": "Alana Cannon",
            "email": "feugiat@Quisque.co.uk"
        },
        {
            "name": "Lara Strickland",
            "email": "purus.ac.tellus@vitaeerat.com"
        },
        {
            "name": "Nero Holcomb",
            "email": "molestie.tortor@Suspendisse.com"
        },
        {
            "name": "Forrest Bass",
            "email": "semper.egestas@nisi.co.uk"
        },
        {
            "name": "Guinevere Oneal",
            "email": "ut.ipsum@molestie.co.uk"
        },
        {
            "name": "Wing Carlson",
            "email": "at@dictumcursusNunc.org"
        },
        {
            "name": "Denise York",
            "email": "sed@Sedcongueelit.org"
        },
        {
            "name": "Leonard Welch",
            "email": "euismod.mauris@nullaInteger.net"
        },
        {
            "name": "Emery Garza",
            "email": "pellentesque@Nullamfeugiat.ca"
        },
        {
            "name": "Alec Valentine",
            "email": "arcu.Vestibulum.ante@ornare.co.uk"
        },
        {
            "name": "Veda Ray",
            "email": "malesuada@laciniavitae.com"
        },
        {
            "name": "Aurora Alvarez",
            "email": "eu.neque.pellentesque@a.edu"
        },
        {
            "name": "Abigail Mooney",
            "email": "cursus.a.enim@loremluctus.ca"
        },
        {
            "name": "Aretha Battle",
            "email": "Pellentesque.tincidunt.tempus@etipsumcursus.com"
        },
        {
            "name": "Declan Calhoun",
            "email": "natoque@ultrices.ca"
        },
        {
            "name": "Gwendolyn Robertson",
            "email": "auctor@infelisNulla.edu"
        },
        {
            "name": "Roary Weber",
            "email": "suscipit.nonummy@pellentesquemassalobortis.edu"
        },
        {
            "name": "Colby Andrews",
            "email": "hendrerit.id.ante@Cras.co.uk"
        },
        {
            "name": "Sasha Puckett",
            "email": "Nulla@eumetus.co.uk"
        },
        {
            "name": "Forrest Hess",
            "email": "a@arcueuodio.org"
        },
        {
            "name": "Tara Bryan",
            "email": "fringilla.Donec.feugiat@non.ca"
        },
        {
            "name": "Chiquita Brewer",
            "email": "pede@duinec.com"
        },
        {
            "name": "Nash Newton",
            "email": "tempus.non.lacinia@quispedePraesent.com"
        },
        {
            "name": "Elizabeth Stanton",
            "email": "vitae@vulputaterisus.net"
        },
        {
            "name": "Faith Bowman",
            "email": "ridiculus@Aliquamfringilla.co.uk"
        },
        {
            "name": "Ainsley Witt",
            "email": "elit.sed.consequat@mitempor.ca"
        },
        {
            "name": "Russell Mcintosh",
            "email": "Duis@Fuscemollis.net"
        },
        {
            "name": "Sonia Shelton",
            "email": "tortor.Integer@eget.ca"
        },
        {
            "name": "Brody Beck",
            "email": "convallis.est.vitae@quis.net"
        },
        {
            "name": "Cassandra Herman",
            "email": "at.augue.id@viverraMaecenasiaculis.co.uk"
        },
        {
            "name": "Baker Hammond",
            "email": "gravida.sagittis.Duis@nisl.com"
        },
        {
            "name": "Catherine Mitchell",
            "email": "erat.Etiam@velsapien.ca"
        },
        {
            "name": "Guinevere Mathis",
            "email": "nibh.Quisque@turpis.net"
        },
        {
            "name": "Basia Sanders",
            "email": "luctus.vulputate@Crassed.edu"
        },
        {
            "name": "Xavier Goodwin",
            "email": "dapibus.quam@sociis.net"
        },
        {
            "name": "Kameko Alvarado",
            "email": "convallis.ante.lectus@aliquetnecimperdiet.org"
        },
        {
            "name": "Elvis Oneill",
            "email": "libero.Donec.consectetuer@vel.net"
        },
        {
            "name": "Dillon Hickman",
            "email": "at@consequatpurus.net"
        },
        {
            "name": "Mariko Le",
            "email": "sed.pede@atvelit.ca"
        },
        {
            "name": "Tiger Whitaker",
            "email": "consequat.lectus.sit@sociisnatoquepenatibus.org"
        },
        {
            "name": "Macy Figueroa",
            "email": "eu@eratnonummyultricies.org"
        },
        {
            "name": "Elmo Davis",
            "email": "lectus@necleoMorbi.ca"
        },
        {
            "name": "Jade Marshall",
            "email": "erat.neque.non@semperetlacinia.net"
        },
        {
            "name": "Daquan Saunders",
            "email": "sit.amet@feugiatnon.org"
        },
        {
            "name": "Keefe Mcdaniel",
            "email": "tortor.Nunc.commodo@pedeultricesa.co.uk"
        },
        {
            "name": "Alec Sandoval",
            "email": "egestas.lacinia.Sed@eu.org"
        },
        {
            "name": "Oscar Bishop",
            "email": "nibh.Aliquam@sodaleseliterat.co.uk"
        },
        {
            "name": "Tatum Robbins",
            "email": "amet.nulla.Donec@sem.edu"
        },
        {
            "name": "William Mercado",
            "email": "Mauris@quamCurabiturvel.net"
        },
        {
            "name": "Ila Buchanan",
            "email": "fringilla.mi@Nuncquisarcu.ca"
        },
        {
            "name": "Ruth Leon",
            "email": "molestie@inhendrerit.com"
        },
        {
            "name": "Wyoming Molina",
            "email": "eu@magnatellusfaucibus.ca"
        },
        {
            "name": "Alden Wall",
            "email": "et.eros@molestiesodales.edu"
        },
        {
            "name": "Howard Nolan",
            "email": "Proin.ultrices@euneque.edu"
        },
        {
            "name": "Melodie Chambers",
            "email": "nec.orci@erategetipsum.ca"
        },
        {
            "name": "Drew Figueroa",
            "email": "ac.turpis.egestas@vitaealiquam.edu"
        },
        {
            "name": "Mohammad Porter",
            "email": "ridiculus@sapienimperdietornare.com"
        },
        {
            "name": "Patience Salas",
            "email": "Etiam.vestibulum.massa@ultrices.org"
        },
        {
            "name": "Amena Barry",
            "email": "elit@malesuada.org"
        },
        {
            "name": "Debra Bryant",
            "email": "rutrum@turpis.net"
        },
        {
            "name": "Leo Barker",
            "email": "tellus.Phasellus@apurusDuis.com"
        },
        {
            "name": "Ora Dawson",
            "email": "et@montesnasceturridiculus.co.uk"
        },
        {
            "name": "Jolene Price",
            "email": "at@tristique.net"
        },
        {
            "name": "Jena Crosby",
            "email": "non.ante@dignissimMaecenas.co.uk"
        },
        {
            "name": "May Mcconnell",
            "email": "consequat.lectus@dictumultriciesligula.ca"
        },
        {
            "name": "Molly Erickson",
            "email": "eleifend.Cras@necimperdietnec.net"
        },
        {
            "name": "Roanna Woodard",
            "email": "eu@faucibus.co.uk"
        },
        {
            "name": "Shaine Clarke",
            "email": "ligula.Aenean@lectusconvallis.com"
        },
        {
            "name": "Herman Forbes",
            "email": "Nunc.pulvinar@posuerecubiliaCurae.edu"
        },
        {
            "name": "Galena Williamson",
            "email": "eu.nibh@porttitor.co.uk"
        },
        {
            "name": "Hanna Sullivan",
            "email": "magna.Duis.dignissim@purusDuiselementum.ca"
        },
        {
            "name": "Sophia Lucas",
            "email": "Aliquam.erat@elitpharetra.co.uk"
        },
        {
            "name": "Channing Vazquez",
            "email": "sapien@ultrices.org"
        },
        {
            "name": "Dalton Skinner",
            "email": "ac@Donectempus.org"
        },
        {
            "name": "Philip Burke",
            "email": "enim@et.co.uk"
        },
        {
            "name": "Zenia Dyer",
            "email": "et.tristique.pellentesque@Sed.ca"
        },
        {
            "name": "Xyla Arnold",
            "email": "Etiam.imperdiet.dictum@leoelementum.ca"
        },
        {
            "name": "Andrew Noel",
            "email": "bibendum@augue.edu"
        },
        {
            "name": "Rowan Dillon",
            "email": "ultrices.iaculis@Quisqueimperdiet.com"
        },
        {
            "name": "Lester Valenzuela",
            "email": "libero.nec@duiaugueeu.com"
        },
        {
            "name": "Simone Reynolds",
            "email": "facilisis@eu.org"
        },
        {
            "name": "Tyler Cantu",
            "email": "ipsum.non@eueratsemper.org"
        },
        {
            "name": "Hop Ross",
            "email": "sed.dui@nequeetnunc.co.uk"
        },
        {
            "name": "Shana Weaver",
            "email": "et.risus.Quisque@Nuncac.co.uk"
        },
        {
            "name": "Paloma Graham",
            "email": "eros.Nam.consequat@Quisque.co.uk"
        },
        {
            "name": "Megan Winters",
            "email": "at@eu.org"
        },
        {
            "name": "Armando Fleming",
            "email": "vitae.aliquet.nec@CurabiturdictumPhasellus.ca"
        },
        {
            "name": "Ira Molina",
            "email": "est.vitae@nisl.com"
        },
        {
            "name": "Nicholas Lindsey",
            "email": "aliquam.eu.accumsan@imperdiet.com"
        },
        {
            "name": "Lacota Cash",
            "email": "eget.venenatis.a@augueidante.edu"
        },
        {
            "name": "Ruth Lawson",
            "email": "ipsum.dolor.sit@Infaucibus.edu"
        },
        {
            "name": "Diana Cooley",
            "email": "porta@dolor.net"
        },
        {
            "name": "Kenyon Rasmussen",
            "email": "Sed.auctor@diam.com"
        },
        {
            "name": "William Stewart",
            "email": "Aliquam@nectellus.ca"
        },
        {
            "name": "Winter Thomas",
            "email": "tristique.aliquet.Phasellus@id.edu"
        },
        {
            "name": "Keith Trevino",
            "email": "risus@dignissimmagnaa.net"
        },
        {
            "name": "Lilah Travis",
            "email": "et.commodo.at@massaInteger.co.uk"
        },
        {
            "name": "Robin Moses",
            "email": "erat.volutpat@sapienNuncpulvinar.ca"
        },
        {
            "name": "Brian Terrell",
            "email": "libero.dui.nec@pellentesque.org"
        },
        {
            "name": "Moana Ingram",
            "email": "Duis@fermentummetus.org"
        },
        {
            "name": "Kristen Jones",
            "email": "vel@luctuset.org"
        },
        {
            "name": "Baker Good",
            "email": "diam@Integer.co.uk"
        },
        {
            "name": "Willa Fitzgerald",
            "email": "nulla.magna.malesuada@mauris.edu"
        },
        {
            "name": "Erin Bird",
            "email": "nec@quis.net"
        },
        {
            "name": "Colby Warner",
            "email": "Praesent.interdum.ligula@Morbi.ca"
        },
        {
            "name": "Aurora Beach",
            "email": "ornare@dolor.org"
        },
        {
            "name": "Zahir Berry",
            "email": "malesuada.fames@quam.edu"
        },
        {
            "name": "Nayda Ford",
            "email": "lobortis.Class@sollicitudinadipiscingligula.com"
        },
        {
            "name": "Abigail Meyer",
            "email": "Etiam.laoreet@acmattissemper.net"
        },
        {
            "name": "Nyssa Cooley",
            "email": "rutrum.lorem@magnisdisparturient.net"
        },
        {
            "name": "Allegra Stanton",
            "email": "augue.Sed.molestie@egestas.edu"
        },
        {
            "name": "Lois Burch",
            "email": "eget.tincidunt.dui@laciniavitaesodales.com"
        },
        {
            "name": "Leilani Newton",
            "email": "a@ligulaAliquamerat.org"
        },
        {
            "name": "Rahim Bradford",
            "email": "pede@pharetra.edu"
        },
        {
            "name": "Renee Berger",
            "email": "nibh.lacinia.orci@accumsaninterdumlibero.com"
        },
        {
            "name": "Ocean Stout",
            "email": "Nullam.feugiat.placerat@nequevenenatislacus.co.uk"
        },
        {
            "name": "Roth Rutledge",
            "email": "suscipit.est.ac@velarcu.co.uk"
        },
        {
            "name": "Bianca Fleming",
            "email": "sem@atpretium.ca"
        },
        {
            "name": "Hilda Sharpe",
            "email": "eu@nondapibus.net"
        },
        {
            "name": "Kylynn Odom",
            "email": "urna@Integereulacus.ca"
        },
        {
            "name": "Clementine Delaney",
            "email": "porttitor.interdum@ipsumPhasellusvitae.co.uk"
        },
        {
            "name": "Heidi Bradley",
            "email": "egestas.a@vitaeodio.com"
        },
        {
            "name": "Keefe Franklin",
            "email": "vestibulum@vehiculaet.co.uk"
        },
        {
            "name": "Hyacinth Cantu",
            "email": "augue@enimcommodohendrerit.co.uk"
        },
        {
            "name": "Cullen Goff",
            "email": "odio.sagittis.semper@consectetuercursuset.com"
        },
        {
            "name": "Cara Washington",
            "email": "vulputate.mauris@elit.com"
        },
        {
            "name": "Doris Kinney",
            "email": "Morbi.accumsan.laoreet@dolor.com"
        },
        {
            "name": "Ahmed Jefferson",
            "email": "in@egetnisidictum.org"
        },
        {
            "name": "Cade Fuller",
            "email": "tellus.lorem.eu@ametdapibusid.edu"
        },
        {
            "name": "Nasim Barnes",
            "email": "Donec.at.arcu@aauctor.ca"
        },
        {
            "name": "Barrett Lawson",
            "email": "sed.orci.lobortis@lobortisrisusIn.net"
        },
        {
            "name": "Mohammad Walter",
            "email": "nunc@nulla.edu"
        }
    ]
    
});