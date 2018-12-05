(function () {
    "use strict";

    function EditController($location, contentTypeResource, templateResource, stylesheetResource, languageResource, dictionaryResource, dataTypeResource, editorService) {

        const vm = this;

        vm.showBackButton = true;

        // open all expansion panels
        vm.propertiesOpen = true;
        vm.contentOpen = true;
        vm.filesOpen = true;
        vm.actionsOpen = true;

        vm.back = back;
        vm.createPackage = createPackage;
        vm.save = save;
        vm.removeContentItem = removeContentItem;
        vm.openContentPicker = openContentPicker;
        vm.openFilePicker = openFilePicker;

        function onInit() {
            // load package

            vm.package = {
                "name": "My package"
            };

            // get all doc types
            contentTypeResource.getAll().then(documentTypes => {
                vm.documentTypes = documentTypes;
            });

            // get all templates
            templateResource.getAll().then(templates => {
                vm.templates = templates;
            });

            // get all stylesheets
            stylesheetResource.getAll().then(stylesheets => {
                vm.stylesheets = stylesheets;
            });

            // TODO: implement macros
            vm.macros = [];

            // get all languages
            languageResource.getAll().then(languages => {
                vm.languages = languages;
            });

            // get all dictionary items
            dictionaryResource.getList().then(dictionaryItems => {
                vm.dictionaryItems = dictionaryItems;
            });

            // get all data types items
            dataTypeResource.getAll().then(dataTypes => {
                vm.dataTypes = dataTypes;
            });

        }

        function back() {
            $location.path("packages/packages/overview");
        }

        function createPackage() {
            console.log("create package");
        }

        function save() {
            console.log("save package");
        }

        function removeContentItem() {
            vm.package.contentItem = null;
        }

        function openContentPicker() {
            const contentPicker = {
                submit: function(model) {
                    if(model.selection && model.selection.length > 0) {
                        vm.package.contentItem = model.selection[0];
                    }
                    editorService.close();
                },
                close: function() {
                    editorService.close();
                }
            };
            editorService.contentPicker(contentPicker);
        }

        function openFilePicker() {
            const filePicker = {
                section: "settings",
                treeAlias: "files",
                entityType: "file",
                onlyInitialized: false,
                submit: function(model) {
                    console.log(model.selection);
                    editorService.close();
                },
                close: function() {
                    editorService.close();
                }
            };
            editorService.treePicker(filePicker);
        }

        onInit();

    }

    angular.module("umbraco").controller("Umbraco.Editors.Packages.EditController", EditController);

})();