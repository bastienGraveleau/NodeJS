
--Devoir NodeJS--

Pour ce devoir j'ai procédé en plusieurs parties. Le but étant de 
créer un chatbot dans une base de données on doit tout d'abord 
faire une liaison entre notre base de données et notre code via 
les API et postman afin de créer des routes. 

Une fois que notre serveur local est active avec npm start nous 
pouvons commencer à créer nôtre code. En utilisant des routes 
nous pouvons communiquer grace aux api et avec postman vérifier 
nos requètes.

D'abord on créer un utilisateur en faisant un .post et en utilisant 
la route /users. On vérifie que le nom d'utilisateur et le mot de 
passe n'éxiste pas déjà dans la base de données et ensuite on 
vérifie que nos données rentrées sont en 'string', si non on envoie 
un message d'erreur. Pour finir nous chiffront le mot de passe 
avant de rentrer l'utilisateur dans la base de données.

Ensuite nous récupérons l'utilisateur toujours sur la même route
avec app.get et nous demandons sur postman de rentrer le nom
d'utilisateur et le mot de passe afin de pouvoir l'identifier et
lui attribuer un cookies d'authetification.

On créer par la suite une discussion avec la même méthodes afin 
que lors de la création du messages l'utilisateur puisse indiquer
grace a un index sur quelle discussions il veut communiquer. 

Lors de la création du message et des discussions nous vérifions 
que l'utilisateur est toujours authetifié. Pour continuer nous 
vérifions si le messages est en 'string' et l'on envoie un message 
d'erreur si ce n'est pas le cas. Si tout est vérifier et valide le 
message peut être créé et sauvagardé en base de donnée. 

Grace au fichier model.js, où il est écris nos fonction que l'on 
exporte dans le fichier index, on peut get et save les messages,
les discussions et les utilisateurs. Cela nous sert afin de toujours
pouvoir vérifier et garder en mémoire la liste des utilisateurs, des 
discussions et des messages dans un fichier JSON.
