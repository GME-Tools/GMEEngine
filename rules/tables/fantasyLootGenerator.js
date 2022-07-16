const dice = require('../dice');
const fantasyLootData = require('../../data/fantasyLootGenerator');

const fantasyLootGenerator = function(campaign, lootBody, lootPlace) {
  let lootBodyModifier = 0;
  let lootFindTotal = 0;
  let lootNumber = 0;
  let lootCategories = [];
  let lootItems = [];

  let lootFindRoll = dice.die(20);
  console.log(lootFindRoll);
  
  for (let i = 1; i <= Object.keys(fantasyLootData.lootOdds).length; i++) {
    if (lootBody === fantasyLootData.lootOdds[i].alias) {
      lootBodyModifier = fantasyLootData.lootOdds[i].modifier;
    }
  }
    
  lootFindTotal = lootFindRoll + lootBodyModifier;
  
  if (lootFindTotal > 10) {
    let lootNumberRoll = dice.die(100);
    console.log(lootNumberRoll);
    
    for (let i = 1; i <= Object.keys(fantasyLootData.lootNumber).length; i++) {
      if (lootNumberRoll >= fantasyLootData.lootNumber[i].value[0] && lootNumberRoll <= fantasyLootData.lootNumber[i].value[1]) {
        lootNumber = fantasyLootData.lootNumber[i].number;
      }
    }
    
    for (let i = 1 ; i <= lootNumber ; i++) {
      let lootItemsRoll = dice.die(100);
      console.log(lootItemsRoll);
      let lootWeaponItem = "";
    
      for (let j = 1; j <= Object.keys(fantasyLootData.lootItems).length; j++) {
        if (lootItemsRoll >= fantasyLootData.lootItems[j][lootPlace] [0] && lootItemsRoll <= fantasyLootData.lootItems[j][lootPlace] [1]) {
          if (fantasyLootData.lootItems[j].name === "Marchandise commerciale") {
            let lootGoodsRoll = dice.die(100);
            console.log(lootGoodsRoll);
            
            for (let k = 1; k <= Object.keys(fantasyLootData.lootGoods).length; k++) {
              if (lootGoodsRoll >= fantasyLootData.lootGoods[k].value[0] && lootGoodsRoll <= fantasyLootData.lootGoods[k].value[1]) {
                lootCategories.push(fantasyLootData.lootItems[j].name);
                lootItems.push(fantasyLootData.lootGoods[k].name);
              }
            }

            
          } else if (fantasyLootData.lootItems[j].name === "Équipement") {
            let lootEquipmentsRoll = dice.die(100);
            console.log(lootEquipmentsRoll);
            
            for (let k = 1; k <= Object.keys(fantasyLootData.lootEquipments).length; k++) {
              if (lootEquipmentsRoll >= fantasyLootData.lootEquipments[k].value[0] && lootEquipmentsRoll <= fantasyLootData.lootEquipments[k].value[1]) {
                lootCategories.push(fantasyLootData.lootItems[j].name);
                lootItems.push(fantasyLootData.lootEquipments[k].name);
              }
            }
          } else if (fantasyLootData.lootItems[j].name === "Bâton") {
            let lootStaffsRoll = dice.die(100);
            console.log(lootStaffsRoll);
            
            for (let k = 1; k <= Object.keys(fantasyLootData.lootStaffs).length; k++) {
              if (lootStaffsRoll >= fantasyLootData.lootStaffs[k].value[0] && lootStaffsRoll <= fantasyLootData.lootStaffs[k].value[1]) {
                lootCategories.push(fantasyLootData.lootItems[j].name);
                lootItems.push(fantasyLootData.lootStaffs[k].name);
              }
            }
          } else if (fantasyLootData.lootItems[j].name === "Anneau" || fantasyLootData.lootItems[j].name === "Collier") {
            let lootRingsPendantsRoll = dice.die(100);
            console.log(lootRingsPendantsRoll);
            
            for (let k = 1; k <= Object.keys(fantasyLootData.lootRingsPendants).length; k++) {
              if (lootRingsPendantsRoll >= fantasyLootData.lootRingsPendants[k].value[0] && lootRingsPendantsRoll <= fantasyLootData.lootRingsPendants[k].value[1]) {
                lootCategories.push(fantasyLootData.lootItems[j].name);
                lootItems.push(fantasyLootData.lootRingsPendants[k].name);
              }
            }
          } else if (fantasyLootData.lootItems[j].name === "Potion" || fantasyLootData.lootItems[j].name === "Parchemin magique") {
            let lootPotionsScrollsRoll = dice.die(100);
            console.log(lootPotionsScrollsRoll);
            
            for (let k = 1; k <= Object.keys(fantasyLootData.lootPotionsScrolls).length; k++) {
              if (lootPotionsScrollsRoll >= fantasyLootData.lootPotionsScrolls[k].value[0] && lootPotionsScrollsRoll <= fantasyLootData.lootPotionsScrolls[k].value[1]) {
                lootCategories.push(fantasyLootData.lootItems[j].name);
                lootItems.push(fantasyLootData.lootPotionsScrolls[k].name);
              }
            }
          } else if (fantasyLootData.lootItems[j].name === "Poison") {
            let lootPoisonsRoll = dice.die(100);
            console.log(lootPoisonsRoll);
            
            for (let k = 1; k <= Object.keys(fantasyLootData.lootPoisons).length; k++) {
              if (lootPoisonsRoll >= fantasyLootData.lootPoisons[k].value[0] && lootPoisonsRoll <= fantasyLootData.lootPoisons[k].value[1]) {
                lootCategories.push(fantasyLootData.lootItems[j].name);
                lootItems.push(fantasyLootData.lootPoisons[k].name);
              }
            }
          } else if (fantasyLootData.lootItems[j].name === "Gemme") {
            let lootGemstonesRoll = dice.die(100);
            console.log(lootGemstonesRoll);
            
            for (let k = 1; k <= Object.keys(fantasyLootData.lootGemstones).length; k++) {
              if (lootGemstonesRoll >= fantasyLootData.lootGemstones[k].value[0] && lootGemstonesRoll <= fantasyLootData.lootGemstones[k].value[1]) {
                lootCategories.push(fantasyLootData.lootItems[j].name);
                lootItems.push(fantasyLootData.lootGemstones[k].name);
              }
            }
          } else if (fantasyLootData.lootItems[j].name === "Armure" || fantasyLootData.lootItems[j].name === "Armure enchantée") {
            let lootArmorRoll = dice.die(100);
            console.log(lootArmorRoll);
            
            for (let k = 1; k <= Object.keys(fantasyLootData.lootArmor).length; k++) {
              if (lootArmorRoll >= fantasyLootData.lootArmor[k].value[0] && lootArmorRoll <= fantasyLootData.lootArmor[k].value[1]) {
                if (fantasyLootData.lootItems[j].name === "Armure enchantée") {
                  let lootArmorEnchantmentRoll = dice.die(100);
                  console.log(lootArmorEnchantmentRoll);
                  
                  for (let l = 1; l <= Object.keys(fantasyLootData.lootArmorEnchantment).length; l++) {
                    if (lootArmorEnchantmentRoll >= fantasyLootData.lootArmorEnchantment[l].value[0] && lootArmorEnchantmentRoll <= fantasyLootData.lootArmorEnchantment[l].value[1]) {
                      lootCategories.push(fantasyLootData.lootItems[j].name);
                      
                      let lootEnchantedItem = fantasyLootData.lootArmor[k].name + " - " + fantasyLootData.lootArmorEnchantment[l].name;
                      
                      lootItems.push(lootEnchantedItem);
                    }
                  }    
                } else {
                  lootCategories.push(fantasyLootData.lootItems[j].name);
                  lootItems.push(fantasyLootData.lootArmor[k].name);
                }
              }
            }
          } else if (fantasyLootData.lootItems[j].name === "Arme de corps à corps" || fantasyLootData.lootItems[j].name === "Arme de corps à corps enchantée") {
            let lootMeleeWeaponsRoll = dice.die(100);
            console.log(lootMeleeWeaponsRoll);
            
            for (let k = 1; k <= Object.keys(fantasyLootData.lootMeleeWeapons).length; k++) {
              if (lootMeleeWeaponsRoll >= fantasyLootData.lootMeleeWeapons[k].value[0] && lootMeleeWeaponsRoll <= fantasyLootData.lootMeleeWeapons[k].value[1]) {
                if (fantasyLootData.lootMeleeWeapons[k].name.includes("Hache")) {
                  let lootAxeRoll = dice.die(100);
                  console.log(lootAxeRoll);
                  
                  for (let l = 1; l <= Object.keys(fantasyLootData.lootAxe).length; l++) {
                    if (lootAxeRoll >= fantasyLootData.lootAxe[l].value[0] && lootAxeRoll <= fantasyLootData.lootAxe[l].value[1]) {
                      lootCategories.push(fantasyLootData.lootItems[j].name);
                      if (fantasyLootData.lootItems[j].name.includes("Arme de corps à corps enchantée") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spécial") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciale") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciaux") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciales")) {
                        lootWeaponItem = fantasyLootData.lootAxe[l].name;
                    } else {
                        lootItems.push(fantasyLootData.lootAxe[l].name);
                      }
                    }
                  }
                } else if (fantasyLootData.lootMeleeWeapons[k].name.includes("Bâton")) {
                  let lootClubRoll = dice.die(100);
                  console.log(lootClubRoll);
                  
                  for (let l = 1; l <= Object.keys(fantasyLootData.lootClub).length; l++) {
                    if (lootClubRoll >= fantasyLootData.lootClub[l].value[0] && lootClubRoll <= fantasyLootData.lootClub[l].value[1]) {
                      lootCategories.push(fantasyLootData.lootItems[j].name);
                      if (fantasyLootData.lootItems[j].name.includes("Arme de corps à corps enchantée") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spécial") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciale") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciaux") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciales")) {
                        lootWeaponItem = fantasyLootData.lootClub[l].name;
                      } else {
                        lootItems.push(fantasyLootData.lootClub[l].name);
                      }
                    }
                  }    
                } else if (fantasyLootData.lootMeleeWeapons[k].name.includes("Couteau")) {
                  let lootKnifeRoll = dice.die(100);
                  console.log(lootKnifeRoll);
                  
                  for (let l = 1; l <= Object.keys(fantasyLootData.lootKnife).length; l++) {
                    if (lootKnifeRoll >= fantasyLootData.lootKnife[l].value[0] && lootKnifeRoll <= fantasyLootData.lootKnife[l].value[1]) {
                      lootCategories.push(fantasyLootData.lootItems[j].name);
                      if (fantasyLootData.lootItems[j].name.includes("Arme de corps à corps enchantée") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spécial") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciale") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciaux") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciales")) {
                        lootWeaponItem = fantasyLootData.lootKnife[l].name;
                      } else {
                        lootItems.push(fantasyLootData.lootKnife[l].name);
                      }
                    }
                  }    
                } else if (fantasyLootData.lootMeleeWeapons[k].name.includes("Fléau")) {
                  let lootFlailRoll = dice.die(100);
                  console.log(lootFlailRoll);
                  
                  for (let l = 1; l <= Object.keys(fantasyLootData.lootFlail).length; l++) {
                    if (lootFlailRoll >= fantasyLootData.lootFlail[l].value[0] && lootFlailRoll <= fantasyLootData.lootFlail[l].value[1]) {
                      lootCategories.push(fantasyLootData.lootItems[j].name);
                      if (fantasyLootData.lootItems[j].name.includes("Arme de corps à corps enchantée") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spécial") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciale") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciaux") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciales")) {
                        lootWeaponItem = fantasyLootData.lootFlail[l].name;
                      } else {
                        lootItems.push(fantasyLootData.lootFlail[l].name);
                      }
                    }
                  }    
                } else if (fantasyLootData.lootMeleeWeapons[k].name.includes("Masse")) {
                  let lootMaceRoll = dice.die(100);
                  console.log(lootMaceRoll);
                  
                  for (let l = 1; l <= Object.keys(fantasyLootData.lootMace).length; l++) {
                    if (lootMaceRoll >= fantasyLootData.lootMace[l].value[0] && lootMaceRoll <= fantasyLootData.lootMace[l].value[1]) {
                      lootCategories.push(fantasyLootData.lootItems[j].name);
                      if (fantasyLootData.lootItems[j].name.includes("Arme de corps à corps enchantée") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spécial") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciale") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciaux") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciales")) {
                        lootWeaponItem = fantasyLootData.lootMace[l].name;
                      } else {
                        lootItems.push(fantasyLootData.lootMace[l].name);
                      }
                    }
                  }    
                } else if (fantasyLootData.lootMeleeWeapons[k].name.includes("Arme d'hast")) {
                  let lootPoleRoll = dice.die(100);
                  console.log(lootPoleRoll);
                  
                  for (let l = 1; l <= Object.keys(fantasyLootData.lootPole).length; l++) {
                    if (lootPoleRoll >= fantasyLootData.lootPole[l].value[0] && lootPoleRoll <= fantasyLootData.lootPole[l].value[1]) {
                      lootCategories.push(fantasyLootData.lootItems[j].name);
                      if (fantasyLootData.lootItems[j].name.includes("Arme de corps à corps enchantée") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spécial") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciale") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciaux") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciales")) {
                        lootWeaponItem = fantasyLootData.lootPole[l].name;
                      } else {
                        lootItems.push(fantasyLootData.lootPole[l].name);
                      }
                    }
                  }    
                } else if (fantasyLootData.lootMeleeWeapons[k].name.includes("Épée")) {
                  let lootSwordRoll = dice.die(100);
                  console.log(lootSwordRoll);
                  
                  for (let l = 1; l <= Object.keys(fantasyLootData.lootSword).length; l++) {
                    if (lootSwordRoll >= fantasyLootData.lootSword[l].value[0] && lootSwordRoll <= fantasyLootData.lootSword[l].value[1]) {
                      lootCategories.push(fantasyLootData.lootItems[j].name);
                      if (fantasyLootData.lootItems[j].name.includes("Arme de corps à corps enchantée") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spécial") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciale") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciaux") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciales")) {
                        lootWeaponItem = fantasyLootData.lootSword[l].name;
                      } else {
                        lootItems.push(fantasyLootData.lootSword[l].name);
                      }
                    }
                  }    
                } else {
                  lootCategories.push(fantasyLootData.lootItems[j].name);

                  if (fantasyLootData.lootItems[j].name.includes("Arme de corps à corps enchantée")) {
                    lootWeaponItem = fantasyLootData.lootMeleeWeapons[k].name;
                  } else {
                    lootItems.push(fantasyLootData.lootMeleeWeapons[k].name);
                  }
                }
                
                if (fantasyLootData.lootItems[j].name.includes("Arme de corps à corps enchantée") && (fantasyLootData.lootMeleeWeapons[k].name.includes("Spécial") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciale") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciaux") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciales"))) {
                  let lootWeaponEnchantmentRoll = dice.die(100);
                  console.log(lootWeaponEnchantmentRoll);

                  for (let l = 1; l <= Object.keys(fantasyLootData.lootWeaponEnchantment).length ; l++) {
                    if (lootWeaponEnchantmentRoll >= fantasyLootData.lootWeaponEnchantment[l].value[0] && lootWeaponEnchantmentRoll <= fantasyLootData.lootWeaponEnchantment[l].value[1]) {
                      lootWeaponItem = lootWeaponItem + " - " + fantasyLootData.lootWeaponEnchantment[l].name;

                      lootItems.push(lootWeaponItem);
                    }
                  }
                } else if (fantasyLootData.lootMeleeWeapons[k].name.includes("Spécial") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciale") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciaux") || fantasyLootData.lootMeleeWeapons[k].name.includes("Spéciales")) {
                  let lootWeaponSpecialFeaturesRoll = dice.die(100);
                  console.log(lootWeaponSpecialFeaturesRoll);

                  for (let l = 1; l <= Object.keys(fantasyLootData.lootWeaponSpecialFeatures).length ; l++) {
                    if (lootWeaponSpecialFeaturesRoll >= fantasyLootData.lootWeaponSpecialFeatures[l].value[0] && lootWeaponSpecialFeaturesRoll <= fantasyLootData.lootWeaponSpecialFeatures[l].value[1]) {
                      lootWeaponItem = lootWeaponItem + " - " + fantasyLootData.lootWeaponSpecialFeatures[l].name;

                      lootItems.push(lootWeaponItem);
                    }
                  }
                } else if (fantasyLootData.lootItems[j].name === "Arme de corps à corps enchantée") {
                  let lootWeaponEnchantmentRoll = dice.die(100);
                  console.log(lootWeaponEnchantmentRoll);
                  
                  for (let l = 1; l <= Object.keys(fantasyLootData.lootWeaponEnchantment).length; l++) {
                    if (lootWeaponEnchantmentRoll >= fantasyLootData.lootWeaponEnchantment[l].value[0] && lootWeaponEnchantmentRoll <= fantasyLootData.lootWeaponEnchantment[l].value[1]) {
                      lootWeaponItem = lootWeaponItem + " - " + fantasyLootData.lootWeaponEnchantment[l].name;

                      lootItems.push(lootWeaponItem);
                    }
                  }
                }
              }
            }
          } else if (fantasyLootData.lootItems[j].name === "Arme à distance" || fantasyLootData.lootItems[j].name === "Arme à distance enchantée") {
            let lootWeaponAmmunitionRoll = dice.die(100);
            console.log(lootWeaponAmmunitionRoll);

            if (lootWeaponAmmunitionRoll <= 50) {
              let lootAmmunitionRoll = dice.die(100);
              console.log(lootAmmunitionRoll);
            
              for (let k = 1; k <= Object.keys(fantasyLootData.lootAmmunition).length; k++) {
                if (lootAmmunitionRoll >= fantasyLootData.lootAmmunition[k].value[0] && lootAmmunitionRoll <= fantasyLootData.lootAmmunition[k].value[1]) {
                  lootCategories.push(fantasyLootData.lootItems[j].name);lootItems.push(fantasyLootData.lootAmmunition[k].name);
                }
              }
            } else {
              let lootRangedWeaponsRoll = dice.die(100);
              console.log(lootRangedWeaponsRoll);
            
              for (let k = 1; k <= Object.keys(fantasyLootData.lootRangedWeapons).length; k++) {
                if (lootRangedWeaponsRoll >= fantasyLootData.lootRangedWeapons[k].value[0] && lootRangedWeaponsRoll <= fantasyLootData.lootRangedWeapons[k].value[1]) {
                  if (fantasyLootData.lootRangedWeapons[j].name.includes("Arc")) {
                  let lootBowRoll = dice.die(100);
                  console.log(lootBowRoll);
                  
                  for (let l = 1; l <= Object.keys(fantasyLootData.lootLongbowShortbow).length; l++) {
                    if (lootBowRoll >= fantasyLootData.lootLongbowShortbow[l].value[0] && lootBowRoll <= fantasyLootData.lootlootLongbowShortbow[l].value[1]) {
                      lootCategories.push(fantasyLootData.lootItems[j].name);
                
                      if (fantasyLootData.lootItems[j].name.includes("Arme à distance enchantée") || fantasyLootData.lootRangedWeapons[k].name.includes("Spécial") || fantasyLootData.lootRangedWeapons[k].name.includes("Spéciale") || fantasyLootData.lootRangedWeapons[k].name.includes("Spéciaux") || fantasyLootData.lootRangedWeapons[k].name.includes("Spéciales")) {
                        lootWeaponItem = fantasyLootData.lootLongbowShortbow[l].name;
                      } else {
                        lootItems.push(fantasyLootData.lootLongbowShortbow[l].name);
                      }
                    }
                  }
                } else if (fantasyLootData.lootRangedWeapons[j].name.includes("Arbalète")) {
                  let lootCrossbowRoll = dice.die(100);
                  console.log(lootCrossbowRoll);
                  
                  for (let l = 1; l <= Object.keys(fantasyLootData.lootCrossbow).length; l++) {
                    if (lootCrossbowRoll >= fantasyLootData.lootCrossbow[l].value[0] && lootCrossbowRoll <= fantasyLootData.lootCrossbow[l].value[1]) {
                      lootCategories.push(fantasyLootData.lootItems[j].name);
                      if (fantasyLootData.lootItems[j].name.includes("Arme à distance enchantée") || fantasyLootData.lootRangedWeapons[k].name.includes("Spécial") || fantasyLootData.lootRangedWeapons[k].name.includes("Spéciale") || fantasyLootData.lootRangedWeapons[k].name.includes("Spéciaux") || fantasyLootData.lootRangedWeapons[k].name.includes("Spéciales")) {
                        lootWeaponItem = fantasyLootData.lootCrossbow[l].name;
                    } else {
                        lootItems.push(fantasyLootData.lootCrossbow[l].name);
                      }
                    }
                  }
                } else {
                  lootCategories.push(fantasyLootData.lootItems[j].name);

                  if (fantasyLootData.lootItems[j].name.includes("Arme à distance enchantée")) {
                    lootWeaponItem = fantasyLootData.lootRangedWeapons[k].name;
                  } else {
                    lootItems.push(fantasyLootData.lootRangedWeapons[k].name);
                  }
                }
                
                if (fantasyLootData.lootItems[j].name.includes("Arme à distance enchantée") && (fantasyLootData.lootRangedWeapons[k].name.includes("Spécial") || fantasyLootData.lootRangedWeapons[k].name.includes("Spéciale") || fantasyLootData.lootRangedWeapons[k].name.includes("Spéciaux") || fantasyLootData.lootRangedWeapons[k].name.includes("Spéciales"))) {
                  let lootWeaponEnchantmentRoll = dice.die(100);
                  console.log(lootWeaponEnchantmentRoll);

                  for (let l = 1; l <= Object.keys(fantasyLootData.lootWeaponEnchantment).length ; l++) {
                    if (lootWeaponEnchantmentRoll >= fantasyLootData.lootWeaponEnchantment[l].value[0] && lootWeaponEnchantmentRoll <= fantasyLootData.lootWeaponEnchantment[l].value[1]) {
                      lootWeaponItem = lootWeaponItem + " - " + fantasyLootData.lootWeaponEnchantment[l].name;

                      lootItems.push(lootWeaponItem);
                    }
                  }
                } else if (fantasyLootData.lootRangedWeapons[k].name.includes("Spécial") || fantasyLootData.lootRangedWeapons[k].name.includes("Spéciale") || fantasyLootData.lootRangedWeapons[k].name.includes("Spéciaux") || fantasyLootData.lootRangedWeapons[k].name.includes("Spéciales")) {
                  let lootWeaponSpecialFeaturesRoll = dice.die(100);
                  console.log(lootWeaponSpecialFeaturesRoll);

                  for (let l = 1; l <= Object.keys(fantasyLootData.lootWeaponSpecialFeatures).length ; l++) {
                    if (lootWeaponSpecialFeaturesRoll >= fantasyLootData.lootWeaponSpecialFeatures[l].value[0] && lootWeaponSpecialFeaturesRoll <= fantasyLootData.lootWeaponSpecialFeatures[l].value[1]) {
                      lootWeaponItem = lootWeaponItem + " - " + fantasyLootData.lootWeaponSpecialFeatures[l].name;

                      lootItems.push(lootWeaponItem);
                    }
                  }
                } else if (fantasyLootData.lootItems[j].name === "Arme à distance enchantée") {
                  let lootWeaponEnchantmentRoll = dice.die(100);
                  console.log(lootWeaponEnchantmentRoll);
                  
                  for (let l = 1; l <= Object.keys(fantasyLootData.lootWeaponEnchantment).length; l++) {
                    if (lootWeaponEnchantmentRoll >= fantasyLootData.lootWeaponEnchantment[l].value[0] && lootWeaponEnchantmentRoll <= fantasyLootData.lootWeaponEnchantment[l].value[1]) {
                      lootWeaponItem = lootWeaponItem + " - " + fantasyLootData.lootWeaponEnchantment[l].name;

                      lootItems.push(lootWeaponItem);
                    }
                  }
                }
                } 
              }
            } 
          }
        }
      }
    }
  } else {
    lootNumber = 0;
  }

  console.log(lootCategories);
  console.log(lootItems);

  for (let i = 0 ; i < lootItems.length ; i++) {
    if (campaign[0].inventory === undefined || campaign[0].camping.length === 0) {
      campaign[0].inventory = [];
      campaign[0].inventory.push({"lootItem": lootItems[i], "lootCategory": lootCategories[i]});
    } else {
      campaign[0].inventory.push({"lootItem": lootItems[i], "lootCategory": lootCategories[i]});
    }
  }

  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });

  return {
    number: lootNumber,
    categories: lootCategories,
    items: lootItems
  }
}

exports.fantasyLootGenerator = fantasyLootGenerator;