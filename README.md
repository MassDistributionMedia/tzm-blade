#TZM Chapters code :: [![Build Status](https://travis-ci.org/TZM/tzm-blade.png)](https://travis-ci.org/TZM/tzm-blade)
* [Node.js](http://nodejs.org/)
* [Blade HTML Compiler](https://github.com/bminer/node-blade)

#Background
The Zeitgeist Movement Global Connect (ZMGC) aims to create an on-line eco-system within which the ideas of Resource Based Economy can be galvanise into actions that can be used in the real world.

It equips members with on-line tools, by providing the infrastructure necessary to easily exchange, analyse and disseminate information in a highly scalable and non-blocking manner using only Open Source software build by the community.

Please refer to the [wiki](https://github.com/TZM/tzm-blade/wiki) for deeper understanding of what this project is hoping to achieve. We also have a public [trello](https://trello.com/zmgc) board. 

#Setup
Before running this application we will need to setup couple of environmental settings, in order not to add any private data within the code.

Here is a list, that is currently used add these to your .zschrc or .bashrc :

    |-------------------------------------------------------------------|
    |Provider  |  Developer API Keys  |AuthID Providers    |SMTP Access |
    |-------------------------------------------------------------------|
    |Google    |  GOOGLE_API_KEY      |GG_APP_ID           |SMTP_USER   |
    |          |                      |GG_APP_SEC          |SMTP_PASSWD |
    |Facebook  |  FB_APP_ID           |*                   |            |
    |          |  FB_APP_SEC          |*                   |            |
    |Twitter   |                      |TT_APP_ID           |            |
    |          |                      |TT_APP_SEC          |            |
    |Yahoo     |                      |YH_APP_ID           |            |
    |          |                      |YH_APP_SEC          |            |
    |LinkedIn  |                      |LI_APP_ID           |            |
    |          |                      |LI_APP_SEC          |            |
    |Github    |                      |GITHUB_ID           |            |
    |          |                      |GITHUB_SEC          |            |
    |Trello    |  TRELLO_ID           |                    |            |
    |          |  TRELLO_SECRET       |                    |            |
    |-------------------------------------------------------------------|

#Installation
After installing node.js, open terminal and navigate to your sandboxes folder

    ☺ git clone git://github.com/TZM/tzm-blade.git
    ☺ cd tzm-blade
    ☺ npm install                                                                                                                                                
    npm http GET https://registry.npmjs.org/express
    npm http GET https://registry.npmjs.org/blade
    ....
    ☺ cake dev
    Server running at http://127.0.0.1:9080/

Now you can navigate to http://127.0.0.1:9080/ and see the website.

#Deployment
The application can be deployed anywhere where you have Nodejs installed, meaning that you can run this on your local machine and setup P2P; For now, this application is running on AppFog at zero cost, as AppFog provides you with a decent enough server to run this application.

To deploy on AppFog, you will need to first create an account and then setup your machine to talk to AppFog, see the [Documentation](https://docs.appfog.com/getting-started/af-cli)

    ☺  npm install

    > zmgc@0.0.1 install /Users/khinester/Documents/Tutorials/Node/Blade
    > node node_modules/coffee-script/bin/cake build

    :)
    
    ☺ npm start
    Server running at http://127.0.0.1:9080/

#Start databases
Currently we employ mongoDB to store the user data and Redis for sessions. We are currently working on migrating this to Riak, please follow the [documentation](#) for the secure deployment.

##Mongo
    ☺  mongod                                                                                                                                                        ruby-2.0.0-p195""
    Tue Jun 11 17:46:06.222 kern.sched unavailable
    Tue Jun 11 17:46:06.234 [initandlisten] MongoDB starting : pid=19865 port=27017 dbpath=/usr/local/var/mongodb 64-bit host=aqoon.local
    Tue Jun 11 17:46:06.234 [initandlisten] db version v2.4.1
    Tue Jun 11 17:46:06.234 [initandlisten] git version: 1560959e9ce11a693be8b4d0d160d633eee75110
    Tue Jun 11 17:46:06.234 [initandlisten] build info: Darwin bs-osx-106-x86-64-1.local 10.8.0 Darwin Kernel Version 10.8.0: Tue Jun  7 16:33:36 PDT 2011; root:xnu-1504.15.3~1/RELEASE_I386 i386 BOOST_LIB_VERSION=1_49
    Tue Jun 11 17:46:06.234 [initandlisten] allocator: system
    Tue Jun 11 17:46:06.234 [initandlisten] options: { bind_ip: "127.0.0.1", config: "/usr/local/etc/mongod.conf", dbpath: "/usr/local/var/mongodb" }
    Tue Jun 11 17:46:06.246 [initandlisten] journal dir=/usr/local/var/mongodb/journal
    Tue Jun 11 17:46:06.246 [initandlisten] recover : no journal files present, no recovery needed
    Tue Jun 11 17:46:06.316 [websvr] admin web console waiting for connections on port 28017
    Tue Jun 11 17:46:06.317 [initandlisten] waiting for connections on port 27017

##Redis
    ☺  redis-server                                                                                                                                                  ruby-2.0.0-p195""
    [98950] 11 Jun 16:35:25.877 # Warning: no config file specified, using the default config. In order to specify a config file use    redis-server /path/to/redis.conf  
    [98950] 11 Jun 16:35:25.879 # Un    able to set the max number of files limit to 10032 (Invalid argument), setting the max clients    configuration to 8160.  
                    _._   
               _.-``__    ''-._   
          _.-``    `.     `_.  ''-._           Redis 2.6.11 (00000000/0) 64 bit   
      .-`` .-```.  ```\   /    _.,_ ''-._   
     (    '      ,          .-`  | `,       )     Running in stand alone mode  
     |`-._`-...-` __...   -.``-._|'` _.-'   |     Port: 6379   
     |    `-._   `._       /     _.-'       |     PID: 98950   
      `-._    `-._  `-.   /  _.-'    _.-'   
     |`-._`-._    `-.__   .-'    _.-'_.-'   |  
     |    `-._`-._           _.-'_.-'       |           http://redis.io  
      `-._    `-._`-.__   .-'_.-'    _.-'   
     |`-._`-._    `-.__   .-'    _.-'_.-'   |  
     |    `-._`-._           _.-'_.-'       |  
      `-._    `-._`-.__   .-'_.-'    _.-'   
          `-._    `-.__   .-'    _.-'   
              `-._           _.-'   
                  `-.__   .-'   
    
    [98950] 11 Jun 16:35:25.880 # Server started, Redis version 2.6.11
    [98950] 11 Jun 16:35:25.880 * The server is now ready to accept connections on port 6379

#Development
To run locally for development use:

    ☺  cake dev
    Watching coffee files
    Watching js files and running server


    DEBUG: Running node-supervisor with
    ....

#Testing
The tests are now on Travis, for continuous integration see [![Build Status](https://travis-ci.org/TZM/tzm-blade.png)](https://travis-ci.org/TZM/tzm-blade) and to run localy you do:

     ☺  cake test
     Assetizing footer
     ...

       app
         ✓ should expose app settings

       sessions
         ✓ should be able to store sessions
         ✓ should be able to retrieve sessions


       3 tests complete (51 ms)

     ✓ Mocha tests complete

#Directories
* /assets         : Stylesheets and Javascripts assets (coffee and less files) managed by the asset pipeline
* /data           : Data files used by D3, GeoLite and Node-Cldr
* /docs           : Various documentations and RFCs
* /layout         : Blade layouts
* /locales        : i18next locales
* /public         : All assets not managed by the asset pipeline (ex: images and vendor libaries)
* /test/front-end : All Knockout application test files (managed by Jasmine)
* /test/apps      : All Express application test files (managed by Mocha)
* /test/lib       : All models libraries test files (managed by Mocha)
* /test/models    : All Express models test files (managed by Mocha)
* /views          : Blade views / pages

#Stats
    ☺  cloc --exclude-dir=.app,buildAssets,data,public/css/font,public/css/fonts,public/css/vendor,public/js/vendor,node_modules .                    ruby-2.0.0-p195 master a6f469a""
         107 text files.
          99 unique files.
       14125 files ignored.

    http://cloc.sourceforge.net v 1.56  T=5.0 s (10.0 files/s, 1159.8 lines/s)
    -------------------------------------------------------------------------------
    Language                     files          blank        comment           code
    -------------------------------------------------------------------------------
    CSS                              5            278            242           2460
    CoffeeScript                    31            224            314           1362
    Javascript                      10             70            129            649
    Bourne Shell                     1              0              0             19
    make                             1             12             13             18
    HTML                             2              3              0              6
    -------------------------------------------------------------------------------
    SUM:                            50            587            698           4514
    -------------------------------------------------------------------------------

#Todo
 - Mocha BDD api and frontend tests
 - Stylus css - update the css
 - Riak
    - Riak cluster setup and deployment
    - Riak administration
    - Riak backup
 - [DocPad integration](https://github.com/TZM/tzm-blade/issues/12) - [DocPad](https://github.com/bevry/docpad)
 - [AppFog Manifest](https://docs.appfog.com/getting-started/af-cli/manifests) for appfog deployment
 - Heroku Procfile and instructions for heroku deployments
 - [Vagrant](http://www.vagrantup.com/) - create a dev environment with Riak cluster and and use the Chef provisioning tool to:
    - install packages, [riak](https://github.com/basho/riak-chef-cookbook), zmgc (node.js, express etc... through npm)
    - create user accounts, as specified in included JSON config files
    - setup riak
    - configure firewalls
    - etc...
 - Production hardening
    - Cluster
    - Error handling
    - Monitoring
- Continuous Integration - [[https://travis-ci.org/TZM/tzm-blade][Travis-CI]] :: [![Build Status](https://travis-ci.org/TZM/tzm-blade.png)](https://travis-ci.org/TZM/tzm-blade)
- Documentation

#Warning
This application is still a work in progress and is not ready for use yet.

#Get involved
The best way to get involved is to `fork` this project and submit `pull` requests or help with the functional and non-functional development, wireframes and writing of documentation.

We need javascript developers, specifically members who know Node.js, Express. Here is a list of how you may help:

  - Development - html5, javascript template development - see [views/](views/) and [assets/](assets/) directory
  - Localization/Translation - we use the i18next library to localize and internationalize this application - see README.md in [locales/](locales/README.md) directory