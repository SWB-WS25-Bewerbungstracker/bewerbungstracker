/*
Sample date for Bewerbungstracker database
    Samples for tables:
      - Address
      - Contact
      - Username
      - Company
      - Application
      - Document
      - Appointment

  Created: 2025-11-08
  Author: Lara Hippenstiel

  Last Edit: 2025-11-09
  Author: Lara Hippenstiel
*/


-- Add sample addresses
INSERT INTO address (AddressID, Street, StreetNo, City, ZIP, Country)
VALUES
    (1, 'Serena-Thanel-Straße', '2', 'Freital', '99291', ''),
    (2, 'Ebertstr.', '070', 'Freital', '17055', ''),
    (3, 'Tyson-Patberg-Platz', '8/9', 'Starnberg', '51818', ''),
    (4, 'Bergerstraße', '82', 'Sondershausen', '77564', ''),
    (5, 'Adamo-Roskoth-Gasse', '64', 'Wismar', '73316', ''),
    (6, 'Larissa-Dietz-Allee', '12', 'Havelberg', '41380', ''),
    (7, 'Skyla-Girschner-Platz', '35', 'Bremen', '31078', ''),
    (8, 'Rennerallee', '296', 'Aurich', '12177', ''),
    (9, 'Pechelstr.', '6', 'Haldensleben', '45604', ''),
    (10, 'Röhrichtring', '5/0', 'Rottweil', '34781', ''),
    (11, 'Wilmsstr.', '807', 'Neuss', '12731', ''),
    (12, 'Jan-Jähn-Gasse', '2', 'Witzenhausen', '38644', ''),
    (13, 'Ditschlerinstraße', '927', 'Artern', '56259', ''),
    (14, 'Buchholzallee', '8/2', 'Lüdenscheid', '74593', ''),
    (15, 'Schmiedtring', '25', 'Sigmaringen', '33797', ''),
    (16, 'Ellen-Hertrampf-Weg', '21', 'Hoyerswerda', '61325', ''),
    (17, 'Horace-Johann-Street', '12', 'Beeskow', '97724', 'Großbritannien');


-- Add sample contacts
INSERT INTO contact (ContactID, ContactFName, ContactLName, ContactEmail, ContactPhoneNo)
VALUES
    (1, 'Billy', 'Rosemann', 'billy.rosemann@example.net', '03865 395287'),
    (2, 'Moritz', 'Erbrecht', 'moritz.erbrecht@example.net', '(05495) 63242'),
    (3, 'Sally', 'Trüb', '', '+49 (0) 7606 069264'),
    (4, 'Silke', 'Reising', '', ''),
    (5, 'Orlando', 'Albers', 'o.albers@example.org', ''),
    (6, 'Wallace', 'Anders', 'wanders@example.org', '(01534) 980293'),
    (7, 'Maik', 'Eigenwillig', '', ''),
    (8, 'Coralie', 'Trommler', '', ''),
    (9, 'Antonia', 'Klemm', 'antonia.k@example.com', '+49(0)5906 01691'),
    (10, 'Gabriele', 'Möchlichen', 'g.möchlichen@example.net', '(04338) 50298'),
    (11, 'Sean', 'Krebs', '', '0842276274'),
    (12, 'Jarla', 'Baum', '', '+49(0)2723 14150'),
    (13, 'Andreas', 'Etzold', '', ''),
    (14, 'Lidia', 'Plath', 'lidia.plath@example.net', '(01662) 05111'),
    (15, 'Herbie', 'Dietz', '', ''),
    (16, 'Leander', 'Kuhl', 'leander.kuhl@example.org', ''),
    (17, 'Abel', 'Schwital', '', ''),
    (18, 'Alessa', 'Heidrich', 'a.heidrich@example.com', '(07212) 66536');


-- Add sample usernames
INSERT INTO username (userID, userFName, userLName, userEmail, userAddress)
VALUES
    (1, 'Alisa', 'Rogner', 'a.rogner@example.net', 1),
    (2, 'Orania', 'Müller', 'om39456@example.com', 2),
    (3, 'Tycho', 'Ullrich', 'tycho.u@example.net', 3),
    (4, 'Belinda', 'Gertz', 'belinda64@example.net', 4),
    (5, 'Henrike', 'Briemer', 'henrike.briemer@example.com', 5);


-- Add sample companies
INSERT INTO company (CompanyID, CompanyName, Size, Logo, CompanyAddress)
VALUES
    (1, 'Schäfer KG', 662799367, '', 6),
    (2, 'Junk AG', 21, '/8fb17a4dfc36c020015fbc76458492bf.jpg', 7),
    (3, 'Vogt GmbH & Co. KG', 147023, '', 8),
    (4, 'Gude', 10, '', 9),
    (5, 'Flantz', 895110, '/9d6d92eb1b93149776b85cf51dda4ff5.jpg', 10),
    (6, 'Littel Ltd', 118775, '/2940dd54a09906576e7f04961047f34f.jpg', 11),
    (7, 'Romaguera, Parisian and Mills', 199173, '/4898ada82070b1aaf0310554130aa988.jpg', 12),
    (8, 'Padberg-Roob', 71341, '/765efe3d22baa0553ea7392a30752d6d.jpg', 13),
    (9, 'Zieme-Mertz', 326053, '/22365fa442ea3958d4679b88976781c8.jpg', 14),
    (10, 'Stiedemann-Kiehn', 194058, '/6e3bee88e2c91c225e9d53494a69f667.jpg', 15),
    (11, 'Bechtelar-Bauch', 284962, '/1d5b610776db9b1229baafd7db6cd16a.jpg', 16),
    (12, 'Mills and Sons', 242198, '/aa07c94807a4094ad52761c5fc401b05.jpg', 17);


-- Add sample applications
INSERT INTO joboffer (JobofferID, Jobtitle, Description, WageMin, WageMax, Rating, Notes, Contact, Company, Appuser)
VALUES
    (1, 'Ad distinctio asperiores omnis autem facilis.', 'Sed qui exercitationem necessitatibus sed. Dicta id earum optio laudantium occaecati laborum. Necessitatibus illo odio fuga et. Voluptatem repudiandae vero ducimus perferendis.', NULL, NULL, 1, '', 1, 1, 1),
    (2, 'Dolores error non blanditiis id dolor.', 'Accusantium modi explicabo repellat quod. Reiciendis et qui rerum repudiandae neque rerum ipsa. Quos magni nostrum nostrum a nihil est iusto.', 50000, 75000, NULL, 'Laudantium amet ducimus natus eum assumenda iure et. Ut atque qui harum omnis. Est itaque doloribus blanditiis sed similique. Adipisci eum neque neque iusto qui et non. Commodi ad magnam non et quo.', 1, 1, 1),
    (3, 'Maiores mollitia distinctio dignissimos corporis.', 'Atque consequatur eligendi sed officiis. Aperiam et qui est aut. Aliquam consequuntur laboriosam adipisci sed unde voluptatem quaerat. Ut sint consectetur itaque et.', 90000, NULL, 5, 'Vel velit eum veniam est ad magni aut dignissimos. Quia et est reprehenderit qui. A nihil omnis hic minus laborum quia.', 2, 2, 1),
    (4, 'Earum velit cupiditate amet reprehenderit temporibus delectus.', 'Aperiam eius qui aut. Consequatur debitis non et ullam consequatur quibusdam. Ducimus eveniet eos fugit ipsum.', 23000, 34000, 3, '', 3, 3, 1),
    (5, 'Accusantium debitis facilis quas sed.', 'Voluptatem sunt eligendi natus omnis. Neque quae omnis excepturi et et rerum harum. Et qui quia quidem eius.', NULL, NULL, NULL, 'Deserunt quo et ab. Dolorum voluptatem vero animi dolorum corporis maxime. Provident aut laudantium eius natus deleniti quis error.', 4, 4, 1),
    (6, 'Eius explicabo quos voluptatem veritatis quos.', 'In blanditiis tenetur corrupti. Suscipit consequatur adipisci nesciunt et earum eius maxime. Voluptatibus corporis et expedita non beatae et cupiditate. Aut saepe consectetur molestiae dicta sit.', 6, 7471, 1, '', 5, 5, 2),
    (7, 'Assumenda ea nostrum consequatur.', 'Dolorem exercitationem ipsa possimus sapiente odio quia. In maiores impedit doloribus quae doloribus. Dignissimos ex officia voluptatem nobis iusto facere. Et minus dolores libero voluptates et et.', 9, 4970, 1, '', 6, 1, 2),
    (8, 'Voluptatum quas quidem et.', 'Totam quod impedit consequatur facilis dolorem. Qui maxime itaque et et. Assumenda ut aperiam qui quos vel a. Dolorem aut rerum non aperiam.', 8, 16863, 3, 'Sed at quia nulla ea numquam perspiciatis at. Ut sit eum in dicta officiis. Nostrum minus qui modi nesciunt. Rerum molestiae aperiam eum commodi voluptas aliquam.', 7, 6, 2),
    (9, 'Nam enim quam distinctio nesciunt quia beatae.', 'Amet exercitationem et eaque aut. Quidem blanditiis animi ullam optio recusandae in.', 7, NULL, 2, '', 8, 2, 3),
    (10, 'Deserunt autem praesentium laboriosam libero est repellat *****.', 'Quo ut et vel ut ratione sint possimus. Ducimus velit voluptatum quia repellat rerum et. Minus qui perspiciatis soluta distinctio nam enim non perferendis.', 2, 193, 4, '', 9, 7, 3),
    (11, 'Dolorem vel sint illum est nesciunt.', 'Odit veniam saepe perspiciatis ut commodi tempore facilis. Qui necessitatibus error ipsam aut laboriosam laudantium dolor.', 3, 10, 1, '', 10, 8, 3),
    (12, 'Fugiat vitae ut rerum qui eius repellat nostrum omnis.', 'Veritatis dolores ea dolorem reiciendis. Placeat molestiae rerum quae laborum architecto. Unde non laboriosam ipsa similique omnis quia est eius. In facilis quia incidunt voluptatum maxime architecto.', 7, 498923773, 5, 'Et nostrum quae sit aperiam non magnam. Tempora hic exercitationem sed sapiente neque ea. Qui itaque repudiandae ut minus qui quasi praesentium. Nulla nostrum amet et sit est suscipit sapiente.', 11, 9, 3),
    (13, 'Voluptatem et nobis rerum reprehenderit a.', 'Sed voluptatem necessitatibus et ducimus. Quia sed corporis qui ipsam. Qui iste doloribus doloremque corporis ipsam quasi. Laborum hic ad excepturi voluptatem. Alias hic sit accusamus est hic ipsa ratione rerum.', 9, 25668317, 3, '', 12, 4, 3),
    (14, 'Et sint consequuntur dolor incidunt.', 'Et et aut sed omnis deserunt. Explicabo doloribus sit modi et enim. Distinctio est quis laudantium et modi. Ut odio id vel maiores qui neque.', 3, 4379, 1, 'Odio voluptatem odit dolore earum commodi unde provident. Eos ipsum necessitatibus debitis pariatur eligendi molestiae. Repellat in dolorem corporis qui iure.', 13, 8, 4),
    (15, 'Quos quo rerum porro in.', 'Odio illum est aut esse. Architecto et est est a. Accusamus dolor atque ducimus voluptatibus et consequuntur deleniti et. In omnis corrupti harum et doloremque. Non fuga adipisci debitis dolores perferendis.', 1, 2, 5, '', 7, 6, 4),
    (16, 'Sit ut autem facere et nulla tempore ea ipsam.', 'Eligendi culpa repudiandae molestiae reprehenderit soluta. Dolorem molestiae nihil est facere ducimus exercitationem pariatur. Sint dolores quod molestias unde. Est consectetur qui qui est et quam eligendi.', 8, 62507138, 2, 'Eum quod sunt excepturi maxime sed vero molestiae quia. Non commodi id dignissimos. Asperiores inventore et eligendi aliquam atque sint exercitationem.', 12, 4, 4),
    (17, 'Exercitationem enim eos nihil fugit et quos.', 'Quo consequuntur quasi sint labore tenetur. Aperiam nihil ratione a in impedit. Illum deleniti ex quam dolor quam.', 7, 1302108, 1, 'Quia reiciendis deserunt nam voluptatem. Asperiores dolores unde odio asperiores. Quia repellendus asperiores maxime rerum exercitationem voluptatem distinctio.', 6, 1, 4),
    (18, 'Saepe numquam non quis molestiae deserunt.', 'Iusto maxime distinctio vel nemo et at ad. Sunt laborum quis dolor vero aut. Tenetur deserunt necessitatibus deserunt consequatur quos sit omnis.', 6, 633979, 3, 'Error laboriosam magni a molestiae. Quis vel eveniet ad et totam molestiae quasi.', 14, 12, 4),
    (19, 'Aut repellendus sit magni quos consequatur perspiciatis ut.', 'Doloremque placeat aut ipsum atque ipsum laboriosam cupiditate odit. Beatae rerum recusandae vero voluptates qui dolor veniam consequatur. Natus ea qui sed deleniti.', 2, 722950353, 1, 'Et odit consequatur nobis optio non. Et et aliquam sed omnis neque delectus. Expedita hic aut nemo molestiae eius laboriosam. Qui earum accusamus molestias.', 15, 9, 5),
    (20, 'Molestiae eum quo ut.', 'Quis nemo cupiditate consequatur exercitationem veniam dignissimos. Quam quod rem illo eos ipsam et assumenda praesentium. Natus ducimus odio dicta quo in repudiandae sit.', 8, 429669708, 2, '', 16, 10, 5),
    (21, 'Sit fugiat voluptatibus fuga deserunt eum.', 'Odio asperiores expedita delectus molestiae tempora aliquam dolore. Sit sunt perferendis consequatur incidunt odit. Dicta nihil neque fugit qui neque. Dolores ratione et quibusdam voluptas enim consectetur et.', 9, 833563615, 3, 'Numquam repellendus ut et odit est. Consequatur deserunt aliquid animi eaque. Ut qui molestias illum facere iusto asperiores cupiditate. Assumenda tempore consequatur esse et aliquid architecto non.', 17, 11, 5),
    (22, 'Architecto iusto et minima excepturi id placeat atque.', 'Et modi corrupti fugit impedit consequatur. Ullam modi et et. Quam eligendi adipisci hic aut nesciunt optio saepe. Quos debitis illum perferendis fuga in aspernatur.', 6, 9, 5, 'Quo quis vero aliquam quidem quis architecto accusantium. Molestiae porro qui deleniti exercitationem et officia occaecati ullam. Architecto distinctio dolore non voluptas nemo ut eos.', 18, 12, 5);


-- Add sample documents
INSERT INTO document (DocumentID, Filename, Filetype, Category, Joboffer)
VALUES
    (1, 'explicabo', 'application/vnd.sun.xml.writer.template', 'sunt', 1),
    (2, 'consequatur', 'application/vnd.uoml+xml', 'modi', 1),
    (3, 'dolore', 'application/vnd.smaf', 'omnis', 2),
    (4, 'sed', 'image/vnd.fpx', 'ut', 3),
    (5, 'eaque', 'application/vnd.kde.kontour', 'sunt', 5),
    (6, 'dolorum', 'video/x-flv', 'ut', 7),
    (7, 'omnis', 'application/x-freearc', 'quis',9),
    (8, 'architecto', 'application/vnd.wap.wmlc', 'consectetur', 10),
    (9, 'est', 'application/x-mie', 'sed', 13),
    (10, 'commodi', 'image/x-portable-bitmap', 'et', 18),
    (11, 'et', 'text/x-opml', 'quidem', 20);


-- Add sample appointments
INSERT INTO appointment (AppointmentID, AppointmentDate, AppointmentName, Joboffer)
VALUES
    (1, '2025-11-30 15:00:00', 'qui', 1),
    (2, '2025-12-15 13:20:00', 'eveniet', 3),
    (3, '2025-12-20 09:05:00', 'harum', 3),
    (4, '2025-12-22 10:30:00', 'ratione', 5),
    (5, '2026-01-07 12:45:00', 'dolorem', 7),
    (6, '2026-01-12 10:45:00', 'rerum', 12),
    (7, '2026-01-13 14:00:00', 'tenetur', 15),
    (8, '2026-01-15 16:15:00', 'facilis', 17),
    (9, '2026-01-15 08:30:00', 'sed', 19),
    (10, '2026-01-20 10:20:00', 'vel', 20),
    (11, '2026-01-24 16:10:00', 'suscipit', 20),
    (12, '2026-01-30 15:00:00', 'dolorum', 21);
