-- Insert moods first since they are independent
INSERT INTO moods (mood_name)
VALUES 
('default'), 
('acknowledge'), 
('happy'), 
('feeding'), 
('hungry'), 
('tired'), 
('sleep'), 
('wake'), 
('dirty'), 
('clean'), 
('angry'), 
('sad'),
('pet'),
('dead');

-- Insert colors since they are also independent
INSERT INTO colors (color_name)
VALUES 
('yellow'), 
('red'), 
('blue'), 
('green'), 
('pink'), 
('orange');

INSERT INTO species (species_name, hunger_mod, happy_mod, energy_mod, clean_mod, lifespan, diet_type, diet_desc, image) 
VALUES
('Slugaboo', 3, 3, 3, 3, 300, 3, 'The simple minded Slugaboo. Normally found in trash, they are loving monsters. They tend to reek, but if you own a Slugaboo long enough, you won’t notice it. They leave trails of slime wherever they go… Some say that slime makes for a good facial cream.', 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816936/Slugaboo_Yellow_Default.png'),
('Hippostyx', 1, 5, 4, 2, 300, 2, 'Hippostyx are kind creatures who dwell in the fiery seas of the afterlife. They are kind to generous souls, offering them safe passage through the underworld. Of course if you don’t pay the Hippostyx with a treat, you may live to regret it.', 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813936/Hippostyx_default.gif'),
('Vulinquent', 10, 6, 4, 8, 300, 1, 'Vulinquent are devious manipulators, enjoying the torment of others. They often use their nose to find their prey, as their ears are too occupied listening to rock music. They tend to go in groups, heading to the next concert. If you see a Vulinquent, run.','https://res.cloudinary.com/deszclhtq/image/upload/v1728521781/Vulture_Neutral_fve8gz.gif');


INSERT INTO sprites (color_id, species_id, mood_id, image_url)
VALUES 

-- Slugaboo Sprites

-- Yellow Slugaboo 
(1, 1, 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816936/Slugaboo_Yellow_Default.png'),
(1, 1, 2, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816959/Slugaboo_Yellow_Acknowledge.png'),
(1, 1, 3, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816913/Slugaboo_Yellow_Happy.png'),
(1, 1, 4, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816921/Slugaboo_Yellow_Feeding.png'),
(1, 1, 5, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816906/Slugaboo_Yellow_Hungry.png'),
(1, 1, 6, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816876/Slugaboo_Yellow_Tired.png'),
(1, 1, 7, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816884/Slugaboo_Yellow_Sleep.png'),
(1, 1, 8, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727819256/Slugaboo_Yellow_Wake.png'),
(1, 1, 9, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816928/Slugaboo_Yellow_Dirty.png'),
(1, 1, 10, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816943/Slugaboo_Yellow_Clean.png'),
(1, 1, 11, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816952/Slugaboo_Yellow_Angry.png'),
(1, 1, 12, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816891/Slugaboo_Yellow_Sad.png'),
(1, 1, 13, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816898/Slugaboo_Yellow_Pet.png'),
(1, 1, 14, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728293262/Slugaboo_dead_daiknw.png'),


-- Red Slugaboo
(2, 1, 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816839/Slugaboo_Red_Default.png'),
(2, 1, 2, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816861/Slugaboo_Red_Acknowledge.png'),
(2, 1, 3, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816789/Slugaboo_Red_Happy.png'),
(2, 1, 4, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816796/Slugaboo_Red_Feeding.png'),
(2, 1, 5, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816782/Slugaboo_Red_Hungry.png'),
(2, 1, 6, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816751/Slugaboo_Red_Tired.png'),
(2, 1, 7, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816759/Slugaboo_Red_Sleep.png'),
(2, 1, 8, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816744/Slugaboo_Red_Wake.png'),
(2, 1, 9, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816832/Slugaboo_Red_Dirty.png'),
(2, 1, 10, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816846/Slugaboo_Red_Clean.png'),
(2, 1, 11, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816854/Slugaboo_Red_Angry.png'),
(2, 1, 12, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816766/Slugaboo_Red_Sad.png'),
(2, 1, 13, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727816773/Slugaboo_Red_Pet.png'),
(2, 1, 14, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728293262/Slugaboo_dead_daiknw.png'),   


-- Blue Slugaboo
(3, 1, 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818655/Slugaboo_Blue_Default.png'),
(3, 1, 2, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818716/Slugaboo_Blue_Acknowledge.png'),
(3, 1, 3, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818406/Slugaboo_Blue_Happy.png'),
(3, 1, 4, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818557/Slugaboo_Blue_Feeding.png'),
(3, 1, 5, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818398/Slugaboo_Blue_Hungry.png'),
(3, 1, 6, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818365/Slugaboo_Blue_Tired.png'),
(3, 1, 7, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818373/Slugaboo_Blue_Sleep.png'),
(3, 1, 8, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818356/Slugaboo_Blue_Wake.png'),
(3, 1, 9, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818638/Slugaboo_Blue_Dirty.png'),
(3, 1, 10, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818666/Slugaboo_Blue_Clean.png'),
(3, 1, 11, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818683/Slugaboo_Blue_Angry.png'),
(3, 1, 12, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818381/Slugaboo_Blue_Sad.png'),
(3, 1, 13, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818389/Slugaboo_Blue_Pet.png'),
(3, 1, 14, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728293262/Slugaboo_dead_daiknw.png'),


-- Green Slugaboo
(4, 1, 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818323/Slugaboo_Green_Default.png'),
(4, 1, 2, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818348/Slugaboo_Green_Acknowledge.png'),
(4, 1, 3, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818299/Slugaboo_Green_Happy.png'),
(4, 1, 4, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818307/Slugaboo_Green_Feeding.png'),
(4, 1, 5, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818195/Slugaboo_Green_Hungry.png'),
(4, 1, 6, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818142/Slugaboo_Green_Tired.png'),
(4, 1, 7, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818150/Slugaboo_Green_Sleep.png'),
(4, 1, 8, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818132/Slugaboo_Green_Wake.png'),
(4, 1, 9, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818315/Slugaboo_Green_Dirty.png'),
(4, 1, 10, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818331/Slugaboo_Green_Clean.png'),
(4, 1, 11, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818340/Slugaboo_Green_Angry.png'),
(4, 1, 12, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818178/Slugaboo_Green_Sad.png'),
(4, 1, 13, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818186/Slugaboo_Green_Pet.png'),
(4, 1, 14, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728293262/Slugaboo_dead_daiknw.png'),


-- Slugaboo Pink Sprites
(5, 1, 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727817971/Slugaboo_Pink_Default.png'),
(5, 1, 2, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727817995/Slugaboo_Pink_Acknowledge.png'),
(5, 1, 3, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727817653/Slugaboo_Pink_Happy.png'),
(5, 1, 4, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727817796/Slugaboo_Pink_Feeding.png'),
(5, 1, 5, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727817645/Slugaboo_Pink_Hungry.png'),
(5, 1, 6, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727817318/Slugaboo_Pink_Tired.png'),
(5, 1, 7, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727817325/Slugaboo_Pink_Sleep.png'),
(5, 1, 8, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727817142/Slugaboo_Pink_Wake.png'),
(5, 1, 9, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727817804/Slugaboo_Pink_Dirty.png'),
(5, 1, 10, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727817978/Slugaboo_Pink_Clean.png'),
(5, 1, 11, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727817986/Slugaboo_Pink_Angry.png'),
(5, 1, 12, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727817493/Slugaboo_Pink_Sad.png'),
(5, 1, 13, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727817637/Slugaboo_Pink_Pet.png'),
(5, 1, 14, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728293262/Slugaboo_dead_daiknw.png'),


-- Orange Slugaboo
(6, 1, 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818099/Slugaboo_Orange_Default.png'),
(6, 1, 2, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818123/Slugaboo_Orange_Acknowledge.png'),
(6, 1, 3, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818075/Slugaboo_Orange_Happy.png'),
(6, 1, 4, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818083/Slugaboo_Orange_Feeding.png'),
(6, 1, 5, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818062/Slugaboo_Orange_Hungry.png'),
(6, 1, 6, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818022/Slugaboo_Orange_Tired.png'),
(6, 1, 7, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818030/Slugaboo_Orange_Sleep.png'),
(6, 1, 8, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818015/Slugaboo_Orange_Wake.png'),
(6, 1, 9, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818092/Slugaboo_Orange_Dirty.png'),
(6, 1, 10, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818107/Slugaboo_Orange_Clean.png'),
(6, 1, 11, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818115/Slugaboo_Orange_Angry.png'),
(6, 1, 12, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818040/Slugaboo_Orange_Sad.png'),
(6, 1, 13, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727818052/Slugaboo_Orange_Pet.png'),
(6, 1, 14, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728293262/Slugaboo_dead_daiknw.png'),

-- Hippostyx Sprites
-- Yellow Hippostyx
(1, 2, 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728152619/Hippo_Yellow_Default.gif'),
(1, 2, 2, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147593/Hippo_Yellow_Acknowlege.png'),
(1, 2, 3, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147593/Hippo_Yellow_Happy.png'),
(1, 2, 4, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728153925/Hippo_Yellow_Feeding.gif'),
(1, 2, 5, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147589/Hippo_Yellow_Hunger.png'),
(1, 2, 6, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147588/Hippo_Yellow_Tired.png'),
(1, 2, 7, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147587/Hippo_Yellow_Sleep.png'),
(1, 2, 8, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147586/Hippo_Yellow_Wake.png'),
(1, 2, 9, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147585/Hippo_Yellow_Dirty.png'),
(1, 2, 10, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147591/Hippo_Yellow_Cleaned.png'),
(1, 2, 11, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147584/Hippo_Yellow_Mad.png'),
(1, 2, 12, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147585/Hippo_Yellow_Sad.png'),
(1, 2, 13, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147592/Hippo_Yellow_Pet.png'),
(1, 2, 14, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728148089/Hippo_Dead_zrmf4i.png'),

-- Red Hippostyx
(2, 2, 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728294303/Hippo_Red_Default_tagkwm.gif'),
(2, 2, 2, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147073/Hippo_Red_Acknowlege_uc3yme.png'),
(2, 2, 3, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147072/Hippo_Red_Happy_mbeibj.png'),
(2, 2, 4, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728294303/Hippo_Red_Feeding_dvdfgk.gif'),
(2, 2, 5, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147069/Hippo_Red_Hunger_pwsbxi.png'),
(2, 2, 6, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147069/Hippo_Red_Tired_ko4xpk.png'),
(2, 2, 7, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147068/Hippo_Red_Sleeping_n6rmfz.png'),
(2, 2, 8, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147067/Hippo_Red_Wake_rifltq.png'),
(2, 2, 9, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147065/Hippo_Red_Dirtypng_dbfkpe.png'),
(2, 2, 10, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147071/Hippo_Red_Cleaned_cmdbe4.png'),
(2, 2, 11, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147065/Hippo_Red_Mad_qdqpbb.png'),
(2, 2, 12, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147064/Hippo_Red_Sad_r6myqm.png'),
(2, 2, 13, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147072/Hippo_Red_Petted_dy75fs.png'),
(2, 2, 14, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728148089/Hippo_Dead_zrmf4i.png'),
-- Blue Hippostyx
(3, 2, 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728294281/Hippo_Blue_Default_hqqcse.gif'),
(3, 2, 2, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147291/Hippo_Blue_Approvedpng_lo8lje.png'),
(3, 2, 3, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147288/Hippo_Blue_Happy_lu5cz5.png'),
(3, 2, 4, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728294280/Hippo_Blue_Feeding_p1jlg7.gif'),
(3, 2, 5, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147285/Hippo_Blue_Hunger_vwfojx.png'),
(3, 2, 6, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147285/Hippo_Blue_Tired_cbhewf.png'),
(3, 2, 7, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147289/Hippo_Blue_SLeeping_xvrsyw.png'),
(3, 2, 8, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147283/Hippo_Blue_Wake_trbibk.png'),
(3, 2, 9, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147283/Hippo_Blue_Dirty_ye2ylh.png'),
(3, 2, 10, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147287/Hippo_Blue_Bath_drwcz6.png'),
(3, 2, 11, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147282/Hippo_Blue_Madpng_qorhpp.png'),
(3, 2, 12, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147282/Hippo_Blue_sad_vufqdr.png'),
(3, 2, 13, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147288/Hippo_Blue_Petted_tt5ehu.png'),
(3, 2, 14, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728148089/Hippo_Dead_zrmf4i.png'),


-- Green Hippostyx
(4, 2, 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728294280/Hippo_Green_Default_n815rb.gif'),
(4, 2, 2, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147331/Hippo_Green_Acknowlege_xzhb54.png'),
(4, 2, 3, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147330/Hippo_Green_Happypng_nhxqib.png'),
(4, 2, 4, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728294280/Hippo_Green_Feeding_kionwv.gif'),
(4, 2, 5, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147326/Hippo_Green_Hungerpng_kccyky.png'),
(4, 2, 6, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147325/Hippo_Green_Tired_bsc9ea.png'),
(4, 2, 7, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147324/Hippo_Green_Sleep_o7fzk6.png'),
(4, 2, 8, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147323/Hippo_Green_Wake_fxnf4o.png'),
(4, 2, 9, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147322/Hippo_Green_Dirtypng_ovdcu9.png'),
(4, 2, 10, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147328/Hippo_Green_Cleaned_efcyke.png'),
(4, 2, 11, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147322/Hippo_Green_Mad_xd9gjq.png'),
(4, 2, 12, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147321/Hippo_Green_Sad_s261nl.png'),
(4, 2, 13, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147329/Hippo_Green_Petted_tfbsh0.png'),
(4, 2, 14, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728148089/Hippo_Dead_zrmf4i.png'),

-- Pink Hippostyx
(5, 2, 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813936/Hippostyx_default.gif'),
(5, 2, 2, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813807/Hippostyx_Acknowlege.png'),
(5, 2, 3, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813849/Hippostyx_Happy.png'),
(5, 2, 4, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728294279/Hippostyx_Feeding_xfh6vx.gif'),
(5, 2, 5, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813854/Hippostyx_Hungry.png'),
(5, 2, 6, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813924/Hippostyx_Tired.png'),
(5, 2, 7, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813812/Hippostyx_Sleep.png'),
(5, 2, 8, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813930/Hippostyx_Wake.png'),
(5, 2, 9, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813833/Hippostyx_Dirty.png'),
(5, 2, 10, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813828/Hippostyx_Clean.png'),
(5, 2, 11, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813860/Hippostyx_Angry.png'),
(5, 2, 12, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813919/Hippostyx_Sad.png'),
(5, 2, 13, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813865/Hippostyx_Pet.png'),
(5, 2, 14, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728148089/Hippo_Dead_zrmf4i.png'),

-- Orange Hippostyx
(6, 2, 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813936/Hippostyx_default.gif'),
(6, 2, 2, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813807/Hippostyx_Acknowlege.png'),
(6, 2, 3, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813849/Hippostyx_Happy.png'),
(6, 2, 4, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728294279/Hippostyx_Feeding_xfh6vx.gif'),
(6, 2, 5, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813854/Hippostyx_Hungry.png'),
(6, 2, 6, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813924/Hippostyx_Tired.png'),
(6, 2, 7, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813812/Hippostyx_Sleep.png'),
(6, 2, 8, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813930/Hippostyx_Wake.png'),
(6, 2, 9, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813833/Hippostyx_Dirty.png'),
(6, 2, 10, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813828/Hippostyx_Clean.png'),
(6, 2, 11, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813860/Hippostyx_Angry.png'),
(6, 2, 12, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813919/Hippostyx_Sad.png'),
(6, 2, 13, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727813865/Hippostyx_Pet.png'),
(6, 2, 14, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728148089/Hippo_Dead_zrmf4i.png'),

-- Yellow Vulinquent
(1, 3, 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728523679/Vulture_Yellow_Neutral_phptuf.gif'),  -- default
(1, 3, 2, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147652/Vulture_Yellow_Acknowlege_rfvtq3.png'), -- acknowledge
(1, 3, 3, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147652/Vulture_Yellow_Acknowlege_rfvtq3.png'), -- happy (missing URL)
(1, 3, 4, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728523677/Vulure_Yellow_Feeding_ssd0ou.gif'), -- feeding
(1, 3, 5, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147645/Vulture_Yellow_Hungry_op5zlu.png'), -- hungry
(1, 3, 6, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147645/Vulture_Yellow_Tired_buouau.png'), -- tired
(1, 3, 7, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147651/Vulture_Yellow_Sleeping_vmsi9b.png'), -- sleeping
(1, 3, 8, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147650/Vulture_Yellow_Wake_vgyrn1.png'), -- wake
(1, 3, 9, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147644/Vulture_Yellow_Dirty_vzcxrw.png'), -- dirty
(1, 3, 10, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147651/Vulture_Yellow_Cleaned_to9qjk.png'), -- clean
(1, 3, 11, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147647/Vulture_Yellow_Mad_xr9q1d.png'), -- angry
(1, 3, 12, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147646/Vulture_Yellow_Sad_cxtylp.png'), -- sad (missing URL)
(1, 3, 13, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147652/Vulture_Yellow_Acknowlege_rfvtq3.png'), -- pet (missing URL)
(1, 3, 14, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147643/Vulture_dead_cfyjrd.png'), -- dead (missing URL)

-- Red Vulinquent 
(2, 3, 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728522238/Vulture_Red_Neutral_hrnapj.gif'),  -- default
(2, 3, 2, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147663/Vulture_Red_Acknowlege_rsyka0.png'), -- acknowledge
(2, 3, 3, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147663/Vulture_Red_Acknowlege_rsyka0.png'), -- happy (missing URL)
(2, 3, 4, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728522454/Vulture_Red_Feeding_kdjgs1.gif'), -- feeding
(2, 3, 5, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147655/Vulture_Red_Hungry_dxq9df.png'), -- hungry
(2, 3, 6, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147656/Vulture_Red_Tired_cqczdt.png'), -- tired
(2, 3, 7, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147661/Vulture_Red_Sleeping_jluel4.png'), -- sleeping
(2, 3, 8, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147660/Vulture_Red_Wake_mze5qk.png'), -- wake
(2, 3, 9, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147654/Vulture_Red_Dirty_bfrmyv.png'), -- dirty
(2, 3, 10, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147662/Vulture_Red_Cleaned_ngiwqd.png'), -- clean
(2, 3, 11, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147657/Vulture_Red_Mad_jxd3d1.png'), -- angry
(2, 3, 12, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147657/Vulture_Red_Sad_dmyffh.png'), -- sad
(2, 3, 13, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147663/Vulture_Red_Acknowlege_rsyka0.png'), -- pet (missing URL)
(2, 3, 14, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147643/Vulture_dead_cfyjrd.png'), -- dead

-- Blue Vulinquent
(3, 3, 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728522938/Vulture_Blue_Neutral_h6r9it.gif'),  -- default
(3, 3, 2, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147689/Vulture_Blue_Acknowlege_clbguo.png'), -- acknowledge
(3, 3, 3, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147689/Vulture_Blue_Acknowlege_clbguo.png'), -- happy (missing URL)
(3, 3, 4, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728523021/Vulture_Blue_Feeding_vpbsra.gif'), -- feeding
(3, 3, 5, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147680/Vulture_Blue_Hungry_sfodnj.png'), -- hungry
(3, 3, 6, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147681/Vulture_Blue_Tired_abq65x.png'), -- tired
(3, 3, 7, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147686/Vulture_Blue_Sleeping_hihtup.png'), -- sleeping
(3, 3, 8, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147686/Vulture_Blue_Wake_i7tatd.png'), -- wake
(3, 3, 9, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147679/Vulture_Blue_Dirty_jsv0ie.png'), -- dirty
(3, 3, 10, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147688/Vulture_Blue_Cleaned_ztbafc.png'), -- clean
(3, 3, 11, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147682/Vulture_Blue_Mad_pddtmj.png'), -- angry
(3, 3, 12, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147682/Vulture_Blue_Sad_dlxz2p.png'), -- sad
(3, 3, 13, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147689/Vulture_Blue_Acknowlege_clbguo.png'), -- pet (missing URL)
(3, 3, 14, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147643/Vulture_dead_cfyjrd.png'), -- dead (missing URL)

-- Green Vulinquent
(4, 3, 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728522692/Vulture_Green_Neutral_tpcf0m.gif'),  -- default
(4, 3, 2, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147676/Vulture_Green_Acknowlege_aqh9ww.png'), -- acknowledge
(4, 3, 3, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147676/Vulture_Green_Acknowlege_aqh9ww.png'), -- happy (missing URL)
(4, 3, 4, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728522715/Vulture_Green_Feeding_jcdesf.gif'), -- feeding
(4, 3, 5, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147666/Vulture_Green_Hungry_eozlrf.png'), -- hungry
(4, 3, 6, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147667/Vulture_Green_Tired_w0n7tf.png'), -- tired
(4, 3, 7, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147673/Vulture_Green_Sleeping_cwvkqu.png'), -- sleeping
(4, 3, 8, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147672/Vulture_Green_Wake_aq6pgk.png'), -- wake
(4, 3, 9, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147666/Vulture_Green_Dirty_x1nnrb.png'), -- dirty
(4, 3, 10, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147674/Vulture_Green_Cleaned_eonyss.png'), -- clean
(4, 3, 11, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147670/Vulture_Green_Mad_rdhhr9.png'), -- angry
(4, 3, 12, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147669/Vulture_Green_Sad_lknsbr.png'), -- sad
(4, 3, 13, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147676/Vulture_Green_Acknowlege_aqh9ww.png'), -- pet (missing URL)
(4, 3, 14, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147643/Vulture_dead_cfyjrd.png'), -- dead (missing URL)

-- Pink
(5, 3, 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728521781/Vulture_Neutral_fve8gz.gif'),  -- default
(5, 3, 2, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147702/Vulture_Approval_lw6bhl.png'), -- acknowledge
(5, 3, 3, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147702/Vulture_Approval_lw6bhl.png'), -- happy (missing URL)
(5, 3, 4, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728521928/Vulture_Feeding_q9krr9.gif'), -- feeding
(5, 3, 5, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147692/Vulture_Hungry_nsimov.png'), -- hungry
(5, 3, 6, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147691/Vulture_Tired_mskkro.png'), -- tired
(5, 3, 7, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147701/Vulture_Sleep_pn6v8a.png'), -- sleeping
(5, 3, 8, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147700/Vulture_Wake_rg9jvh.png'), -- wake
(5, 3, 9, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147695/Vulture_Dirty_w5dix2.png'), -- dirty
(5, 3, 10, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147701/Vulture_Bath_mib7ty.png'), -- clean
(5, 3, 11, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147697/Vulture_Mad_a8znkc.png'), -- angry
(5, 3, 12, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147695/Vulture_Sad_srpyon.png'), -- sad
(5, 3, 13, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147702/Vulture_Approval_lw6bhl.png'), -- pet (missing URL)
(5, 3, 14, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147643/Vulture_dead_cfyjrd.png'), -- dead (missing URL)

-- Orange Vulinquent
(6, 3, 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728521781/Vulture_Neutral_fve8gz.gif'),  -- default
(6, 3, 2, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147702/Vulture_Approval_lw6bhl.png'), -- acknowledge
(6, 3, 3, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147702/Vulture_Approval_lw6bhl.png'), -- happy (missing URL)
(6, 3, 4, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728521928/Vulture_Feeding_q9krr9.gif'), -- feeding
(6, 3, 5, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147692/Vulture_Hungry_nsimov.png'), -- hungry
(6, 3, 6, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147691/Vulture_Tired_mskkro.png'), -- tired
(6, 3, 7, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147701/Vulture_Sleep_pn6v8a.png'), -- sleeping
(6, 3, 8, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147700/Vulture_Wake_rg9jvh.png'), -- wake
(6, 3, 9, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147695/Vulture_Dirty_w5dix2.png'), -- dirty
(6, 3, 10, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147701/Vulture_Bath_mib7ty.png'), -- clean
(6, 3, 11, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147697/Vulture_Mad_a8znkc.png'), -- angry
(6, 3, 12, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147695/Vulture_Sad_srpyon.png'), -- sad
(6, 3, 13, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147702/Vulture_Approval_lw6bhl.png'), -- pet (missing URL)
(6, 3, 14, 'https://res.cloudinary.com/deszclhtq/image/upload/v1728147643/Vulture_dead_cfyjrd.png'); -- dead (missing URL)

INSERT INTO users (name, email, password, created_at) 
VALUES 
('Ash Ketchum', 'Poopybuttholee@example.com', 'password123', CURRENT_TIMESTAMP),
('Sorren Jao', 'Poopybuttholee@example.com', 'password123', CURRENT_TIMESTAMP),
('Krisan Manoharan', 'Poopybuttholee@example.com', 'password123', CURRENT_TIMESTAMP);

INSERT INTO personalities(personality_name, energy_decay, happiness_decay, hunger_decay, cleanliness_decay)
VALUES
('Messy', 1, 1, 1.5, 0.5),
('Hardy', 1, 1, 1, 1),
('Gloomy', 1, 0.5, 1.5, 1),
('Weary', 0.5, 1, 1.5, 1),
('Friendly', 1, 1.5, 1, 0.5),
('Jolly', 0.5, 1.5, 1, 1),
('Bold', 1, 1.5, 0.5, 1),
('Loyal', 1, 1, 1, 1),
('Relaxed', 1.5, 1, 0.5, 1),
('Calm', 1.5, 0.5, 1, 1),
('Gentle', 1, 1, 1, 1),
('Mischevious', 1.5, 1, 1, 0.5),
('Lonely', 1, 0.5, 1, 1.5),
('Mild', 1, 1, 1, 1),
('Logical', 1, 1, 0.5, 1.5),
('Obsessive', 0.5, 1, 1, 1.5);

-- Insert shop since toys, toiletries, and foods depend on it
INSERT INTO shop (created_at) 
VALUES (CURRENT_TIMESTAMP);

-- Insert toys, toiletries, and foods since they depend on the shop
INSERT INTO toys (name, price, effects, description, shop_id, toy_image) VALUES
('Doll', 100, 50, 'Sometimes, your pet needs a friend!', 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727812849/toy_doll.png'),
('Ball', 50, 25, 'Round and bouncy… Just don’t pop it', 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727812841/toy_ball.png'),
('iPad', 1000, 100, 'The new babysitter', 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727812767/toy_ipad.png'),
('Paint Set', 150, 60, 'It may get on your walls, floor, and ceiling', 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727812873/toy_paint.png'),
('Yoyo', 60, 30, 'Walk your pet, and walk the dog', 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727812909/toy_yoyo.png'),
('Rubber Ducky', 40, 20, 'If it quacks like a duck, it’s a programmer', 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727812877/toy_duck.png')

INSERT INTO toiletries (name, price, effects, description, shop_id, toiletry_image) VALUES
('Soap', 25, 5, 'Don’t drop the soap!', 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727812844/toiletry_soap.png'),
('Hairbrush', 50, 35, 'Even works on bald pets!', 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727812786/toiletry_hairbrush.png'),
('Toilet Paper', 25, 5, 'For those hard to clean messes', 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727812883/toiletry_toilet_paper.png'),
('Toothbrush', 40, 30, 'Make your smile shine', 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727812895/toiletry_toothbrush.png')

INSERT INTO foods (name, price, effects, food_type, description, shop_id, food_image) VALUES
('Rotting Banana', 5, 5, 2, 'You must really hate your pet…', 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727812846/food_rotting_banana.png'),
('Salad', 15, 10, 2, 'I always enjoy tossing salad', 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727812885/food_salad.png'),
('Can of Beans', 15, 15, 2, 'You to have bean there', 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727812838/food_can_of_beans.png'),
('Chicken Leg', 15, 15, 3, 'This chicken didn’t make it across the road', 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727812803/food_chicken_leg.png'),
('Sushi', 30, 20, 3, 'Prepared by the finest', 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727812888/food_sushi.png'),
('Blueberry Pie', 30, 20, 2, 'Just a cherry pie painted blue', 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727812879/food_pie.png'),
('Hamburger', 35, 25, 3, 'Nothing fast about this burger', 1, 'https://res.cloudinary.com/deszclhtq/image/upload/v1727812784/food_hamburger.png')


-- Insert inventory since it depends on users
INSERT INTO inventory (user_id, money) VALUES
(1, 800.0);

-- Insert user toys, toiletries, and foods since they depend on inventory and item tables
INSERT INTO user_toys (count, user_id, inventory_id, item_type_id) VALUES
(99, 1, 1, (SELECT id FROM toys WHERE name = 'Doll')),
(99, 1, 1, (SELECT id FROM toys WHERE name = 'Ball')),
(1, 1, 1, (SELECT id FROM toys WHERE name = 'Yoyo'));

INSERT INTO user_toiletries (count, user_id, inventory_id, item_type_id) VALUES
(99, 1, 1, (SELECT id FROM toiletries WHERE name = 'Soap')),
(99, 1, 1, (SELECT id FROM toiletries WHERE name = 'Hairbrush')),
(99, 1, 1, (SELECT id FROM toiletries WHERE name = 'Toilet Paper'));

INSERT INTO user_foods (count, user_id, inventory_id, item_type_id) VALUES
(99, 1, 1, (SELECT id FROM foods WHERE name = 'Rotting Banana')),
(99, 1, 1, (SELECT id FROM foods WHERE name = 'Salad')),
(99, 1, 1, (SELECT id FROM foods WHERE name = 'Can of Beans'));

-- Insert pets last as they depend on users, species, personalities, sprites, and moods
INSERT INTO pets (user_id, species_id, name, age, adopted_at, sprite_id, mood_id, color_id, personality_id, update_time, energy, happiness, hunger, cleanliness) 
VALUES
(1, 1, 'Glurb', 5, CURRENT_TIMESTAMP, 27, 1, 3, 2, CURRENT_TIMESTAMP, 100, 100, 100, 100),
(1, 2, 'Big Bertha', 5, CURRENT_TIMESTAMP, 127, 1, 4, 7, CURRENT_TIMESTAMP, 30, 30, 30, 30);
