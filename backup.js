const oFateCheckData = require('./data/fateCheck');
const oEventData = require('./data/event');

app.post('/fatecheck', (req, res) => {
			const campaignDB = client.db('campaign001');
			const settingsCollection = campaignDB.collection('settings');

			let sOdd = '';
			let iModifier = 0;
			let iModifierYesNo = 0;
			let iChaosDice = 0;
			let sAnswer = '';
			let bRandomEvent = false;
			let iEventFocus = 0;
			let sEventFocusName = '';
			let sEventFocusDescription = '';
			let sEventFocusNeed = '';
			let iEventAction = 0;
			let iEventSubject = 0;
			let sEventAction = '';
			let sEventSubject = '';

			let iFateCheck1 = Math.floor(Math.random() * 10 + 1);
			let iFateCheck2 = Math.floor(Math.random() * 10 + 1);
			let iFactorDice = Math.floor(Math.random() * 10 + 1);

			for (
				let i = 1;
				i <= Object.keys(oFateCheckData.oddsRollModifier).length;
				i++
			) {
				if (req.body.odd === oFateCheckData.oddsRollModifier[i].alias) {
					sOdd = oFateCheckData.oddsRollModifier[i].odd;
					iModifier = oFateCheckData.oddsRollModifier[i].modifier;
					break;
				}
			}

			const settingsCursor = settingsCollection
				.find()
				.toArray()
				.then(results => {
					iChaosDice = results[0].chaosFactor;

					for (
						let i = 1;
						i <= Object.keys(oFateCheckData.chaosFactor).length;
						i++
					) {
						if (
							results[0].chaosFactor >=
								oFateCheckData.chaosFactor[i].value[0] &&
							results[0].chaosFactor <= oFateCheckData.chaosFactor[i].value[1]
						) {
							if (req.body.yesorno === 'y') {
								iModifierYesNo = oFateCheckData.chaosFactor[i].modifierYes;
							} else {
								iModifierYesNo = oFateCheckData.chaosFactor[i].modifierNo;
							}

							break;
						}
					}

					if (iFateCheck1 + iFateCheck2 + iModifier + iModifierYesNo >= 11) {
						sAnswer = 'OUI';
					} else {
						sAnswer = 'NON';
					}

					if (iFactorDice <= iChaosDice) {
						if (iFateCheck1 === iFateCheck2) {
							bRandomEvent = true;

							if (sAnswer === 'OUI') {
								sAnswer = 'OUI EXCEPTIONNEL';
							} else {
								sAnswer = 'NON EXCEPTIONNEL';
							}
						} else if (iFateCheck1 % 2 !== 0 && iFateCheck2 % 2 !== 0) {
							if (sAnswer === 'OUI') {
								sAnswer = 'OUI EXCEPTIONNEL';
							} else {
								sAnswer = 'NON EXCEPTIONNEL';
							}
						} else if (iFateCheck1 % 2 === 0 && iFateCheck2 % 2 === 0) {
							bRandomEvent = true;
						}
					}

					if (bRandomEvent === true) {
						iEventFocus = Math.floor(Math.random() * 100 + 1);

						for (
							let i = 1;
							i <= Object.keys(oEventData.eventFocus).length;
							i++
						) {
							if (
								iEventFocus >= oEventData.eventFocus[i].value[0] &&
								iEventFocus <= oEventData.eventFocus[i].value[1]
							) {
								sEventFocusName = oEventData.eventFocus[i].name;
								sEventFocusDescription = oEventData.eventFocus[i].description;
								sEventFocusNeed = oEventData.eventFocus[i].need;

								iEventAction = Math.floor(Math.random() * 100 + 1);
								iEventSubject = Math.floor(Math.random() * 100 + 1);

								sEventAction = oEventData.eventAction[iEventAction].name;
								sEventSubject = oEventData.eventSubject[iEventSubject].name;
							}
						}
					}

					res.status(200).json({
						odd: sOdd,
						chaos: iChaosDice,
						answer: sAnswer,
						eventFocusName: sEventFocusName,
						eventFocusDescription: sEventFocusDescription,
						eventAction: sEventAction,
						eventSubject: sEventSubject
					});
				})
				.catch(error => console.error(error));
		});