let express = require('express');
let router = express.Router();
let mysql = require('mysql');
// let debug_log = require('../other/utils').debug_log;

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TeamFinder"
});

router.get('/', (req, res) => {
    res.render('pages/advanced-search', {tab: '1'});
});

router.get('/teams', (req, res) => {
    debug.log(req.query);
    let searchPreferences = req.query;
    let params = [];
    let query = 'SELECT * FROM teams WHERE';
    if(searchPreferences.teamNameCheck == 'on') {
        query += ' NAME LIKE ? AND';
        params.push(`%${searchPreferences.teamName}%`);
    }
    if(searchPreferences.teamHackatonCheck == 'on') {
        query += ' HACKATON LIKE ? AND';
        params.push(`%${searchPreferences.teamHackaton}%`);
    }
    if(searchPreferences.teamDateCheck == 'on') {
        query += ' START_DATE >= ? AND END_DATE <= ? AND';
        params.push(searchPreferences.date_start);
        params.push(searchPreferences.date_end);
    }
    query += ' ACTIVE = \'1\' ORDER BY TIMESTAMP DESC';
    debug.log(query);
    debug.log(params);

    con.query(query, params, (err, result) => {
        if (err) throw err;

        //--- DO SOME SPECIAL MAGIC FOR PLATFORMS ---//
        if(searchPreferences.platformsTeamInputCheck == 'on' && searchPreferences.platformsTeamInput != '') {
            let platforms = searchPreferences.platformsTeamInput.split(',');
            let results = [];
            result.forEach((team) => {
                if(match_platform(platforms, JSON.parse(team.PLATFORMS))) {
                    console.log(`Added team with uuid ${team.ID} with platforms ${team.PLATFORMS} | Filter: ${platforms}`);
                    results.push(team);
                }
            });
            // console.log(result);
            // console.log(results);
            result = results;
        }


        //--- FILTER RESULTS ---//
        let xss = require('xss');
        debug.log(result[0]);
        debug.log(result);
        result = JSON.parse(xss.escapeHtml((JSON.stringify(result))));
        debug.log(result[0]);
        result.forEach((team) => require('../other/security').convertUUIDToBase64(team.ID, (b64) => team.BASE64 = b64));
        res.send({status: 'successful', teams: result});
    });
});

router.get('/projects', (req, res) => {
    debug.log(req.query);
    let searchPreferences = req.query;
    let params = [];
    let query = 'SELECT * FROM projects WHERE';
    if (searchPreferences.projectNameCheck == 'on') {
        query += ' NAME LIKE ? AND';
        params.push(`%${searchPreferences.projectName}%`);
    }
    if (searchPreferences.commitmentLevelCheck == 'on') {
        query += ' COMMITMENT = ? AND';
        params.push(searchPreferences.commitmentLevel);
    }
    /*if(searchPreferences.platformsInputCheck == 'on') {
        query += 'COMMITMENT = ?';
        params.push(searchPreferences.commitmentLevel);
    }*/
    if (searchPreferences.stageCheck == 'on') {
        query += ' STAGE = ? AND';
        params.push(searchPreferences.stage);
    }
    if (searchPreferences.budgetCheck == 'on') {
        query += ' BUDGET = ? AND';
        params.push(searchPreferences.budget);
    }
    if (searchPreferences.fundingCheck == 'on') {
        if (searchPreferences.funding == 'on')
            query += ' FUNDING = \'true\' AND';
        else
            query += ' FUNDING = \'false\' AND';
    }
    query += ' ACTIVE = \'1\' ORDER BY TIMESTAMP DESC';

    debug.log(query);
    debug.log(params);
    con.query(query, params, (err, result) => {
        if (err) throw err;

        //--- DO SOME SPECIAL MAGIC FOR PLATFORMS ---//
        if(searchPreferences.platformsInputCheck == 'on' && searchPreferences.platformsInput != '') {
            let platforms = searchPreferences.platformsInput.split(',');
            let results = [];
            result.forEach((project) => {
               if(match_platform(platforms, JSON.parse(project.PLATFORMS))) {
                   console.log(`Added project with uuid ${project.ID} with platforms ${project.PLATFORMS} | Filter: ${platforms}`);
                   results.push(project);
               }
            });
            // console.log(result);
            // console.log(results);
            result = results;
        }


        //--- FILTER RESULTS ---//
        let xss = require('xss');
        debug.log(result[0]);
        result = JSON.parse(xss.escapeHtml((JSON.stringify(result))));
        debug.log(result[0]);
        result.forEach((project) => require('../other/security').convertUUIDToBase64(project.ID, (b64) => project.BASE64 = b64));
        res.send({status: 'successful', projects: result});
    });
});

function match_platform(filters, platforms) {
    for (i in filters) {
        for (j in platforms) {
           if(platforms[j].includes(filters[i]) || filters[i].includes(platforms[j]))
               return true;
        }
    }
    return false;
}

module.exports = {url: '/advanced-search', router: router};