const fs = require('fs');
const path = require('path');

// Charger les données depuis rulesFr
const { rulesFr } = require('C:/Users/BENHASFA/Desktop/Ergoqual aliment db scripts/ErgoqualRulesAliment/InputsergoqualRules.txt');

// Chemin du dossier contenant les fichiers de règles
const directoryPath = 'C:\\Users\\BENHASFA\\Desktop\\Ergoqual-Moulinette\\Inputs\\Rules\\fr';

// Fonction pour vérifier si un fichier de règle existe pour chaque ErrorId
const checkRules = () => {
    // Lire les fichiers du dossier
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.error('Unable to scan directory: ' + err);
        }

        // Créer une liste des ruleId à partir des fichiers JSON dans le dossier
        const ruleIds = files
            .filter(file => path.extname(file) === '.json')
            .map(file => path.basename(file, '.json')); // Extraire le nom du fichier sans l'extension

        // Parcourir chaque élément dans rulesFr et ne retourner que ceux où ruleIdExists est false
        const transformedDataFR = Object.keys(rulesFr)
            .map(key => {
                const item = rulesFr[key];
                const errorId = item.ErrorId;

                // Vérifier si l'ErrorId correspond à un ruleId dans la liste des fichiers
                const ruleIdExists = ruleIds.includes(errorId);

                // Retourner uniquement les éléments où ruleIdExists est false
                if (!ruleIdExists) {
                    return {
                        critère: errorId,
                        ruleIdExists: ruleIdExists
                    };
                }
            })
            // Filtrer les undefined qui peuvent apparaître si ruleIdExists est true
            .filter(item => item !== undefined);

        // Afficher les résultats ou utiliser selon vos besoins
        console.log(transformedDataFR);
        console.log(transformedDataFR.length);
    });
};

// Appeler la fonction pour démarrer le processus
checkRules();
