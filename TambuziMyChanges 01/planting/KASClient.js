var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var KASClient;
(function (KASClient) {
    var App;
    (function (App) {
        /**
        * To simulate clients on older versions, versions starting from "0", "1", "2", ...
        * @param {string} version
        */
        function setCompatibilityMode(version) {
            KASClient.Version.setClientSupportedVersion(version);
        }
        App.setCompatibilityMode = setCompatibilityMode;
        /**
        * Gets users' details (name, pic, phone number, etc.) against their ids
        * @param {string[]} userIds array of user ids
        * @param {Callback} callback with below parameters:
        * * * * @param {Dictionary<UserId: string, UserInfo: KASUser>} userIdToInfoMap (users' details against their ids) can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getUsersDetailsAsync(userIds, callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                KASClient.getJsonFromFileAsync("mock/user.json", function (userJson, error) {
                    var userIdToInfoMap = {};
                    for (var i = 0; i < userIds.length; i++) {
                        var userId = userIds[i];
                        var userInfo = userJson;
                        userInfo["id"] = "USR_" + userId;
                        userInfo["uId"] = userId;
                        userIdToInfoMap[userId] = KASClient.KASUser.fromJSON(userInfo);
                    }
                    if (callback) {
                        callback(userIdToInfoMap, null);
                    }
                });
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getUserDetails(userIds, function (userIdToInfoJson, error) {
                var userIdToInfoMap = {};
                for (var userId in userIdToInfoJson) {
                    var userInfo = userIdToInfoJson[userId];
                    if (typeof userInfo === "string") {
                        userInfo = KASClient.parseJsonObject(userInfo);
                    }
                    userIdToInfoMap[userId] = KASClient.KASUser.fromJSON(userInfo);
                }
                if (callback) {
                    callback(userIdToInfoMap, error);
                }
            });
        }
        App.getUsersDetailsAsync = getUsersDetailsAsync;
        /**
        * Gets users' details (name, pic, phone number, etc.) against their ids
        * @param {Callback} callback with below parameters:
        * * * * @param {string} token got from integeration service
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getIntegerationServiceTokenAsync(callback) {
            KASClient.getIntegerationServiceToken(function (token, error) {
                if (callback) {
                    callback(token, error);
                }
            });
        }
        App.getIntegerationServiceTokenAsync = getIntegerationServiceTokenAsync;
        /**
        * Gets deviceId
        * @param {Callback} callback with below parameters:
        * * * * @param {string} deviceId got from integeration service
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getDeviceIdAsync(callback) {
            KASClient.getDeviceId(function (deviceId, error) {
                if (callback) {
                    callback(deviceId, error);
                }
            });
        }
        App.getDeviceIdAsync = getDeviceIdAsync;
        /**
        * Shows a native contact picker, and returns an array of all the selected users' details
        * @param {string} title of Contact Picker
        * @param {string[]} selectedMutableUser array of selected userIds
        * @param {string[]} selectedImmutableUser array of fixed selected userIds
        * @param {boolean} isSingleSelection single selection in Contact Picker
        * @param {Callback} callback with below parameters:
        * * * * @param {KASUser[]} selectedUsers (array of user details) can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function showContactPickerAsync(title, selectedMutableUser, selectedImmutableUser, isSingleSelection, callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                KASClient.getJsonFromFileAsync("mock/user.json", function (userJson, error) {
                    var userInfo = KASClient.KASUser.fromJSON(userJson);
                    if (callback) {
                        callback([userInfo, userInfo, userInfo], null);
                    }
                });
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getSelectedUsers([title, selectedMutableUser, selectedImmutableUser, isSingleSelection], function (usersJson, error) {
                var users = [];
                for (var i in usersJson) {
                    users.push(KASClient.KASUser.fromJSON(usersJson[i]));
                }
                if (callback) {
                    callback(users, error);
                }
            });
        }
        App.showContactPickerAsync = showContactPickerAsync;
        /**
        * Gets whether talkback is enabled or not
        * @param {Callback} callback with below parameters:
        * * * * @param {boolean} talkBackEnabled true if talkback is enabled
        */
        function isTalkBackEnabledAsync(callback) {
            KASClient.isTalkBackEnabled(function (talkBackEnabled, error) {
                if (callback && error == null) {
                    callback(talkBackEnabled);
                }
            });
        }
        App.isTalkBackEnabledAsync = isTalkBackEnabledAsync;
        /**
        * Reads the text if TalkBack/VoiceOver enabled
        * @param {talkBackText} string to read by talkback
        */
        function readTalkBackMessage(talkBackMessage) {
            KASClient.readTalkBackMessageNative(talkBackMessage);
        }
        App.readTalkBackMessage = readTalkBackMessage;
        /**
        * Shows a native image picker, and returns the selected image path
        * @param {Callback} callback with below parameters:
        * * * * @param {string} selectedImagePath can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function showImagePickerAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                if (callback) {
                    callback("file://DummyAttachmentPath", null);
                }
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getAttachmentPath(callback);
        }
        App.showImagePickerAsync = showImagePickerAsync;
        /**
         * Displays an attachment picker in the native layer
         * @param supportedTypes array of supported attachment types for the picker.
         * @param props additional props to configure the picker
         * @param callback callback with list of selected attachments
         */
        function showAttachmentPickerAsync(supportedTypes, props, callback) {
            KASClient.getAttachmentPaths([supportedTypes, JSON.stringify(props)], function (selectedAttachmentJson, error) {
                var selectedAttachments = [];
                for (var i in selectedAttachmentJson) {
                    selectedAttachments.push(KASClient.KASAttachmentFactory.fromJSON(JSON.parse(selectedAttachmentJson[i])));
                }
                if (callback) {
                    callback(selectedAttachments, error);
                }
            });
        }
        App.showAttachmentPickerAsync = showAttachmentPickerAsync;
        /**
         * Download the attachment specified
         * @param attachment attachment with a valid server path to download
         * @param callback callback on download completion
         */
        function downloadAttachmentAsync(attachment, callback) {
            KASClient.downloadAttachment(attachment.toJSON(), function (downloadedAttachmentJSON, error) {
                var downloadedAttachment = KASClient.KASAttachment.fromJSON(downloadedAttachmentJSON);
                if (callback) {
                    callback(downloadedAttachment, error);
                }
            });
        }
        App.downloadAttachmentAsync = downloadAttachmentAsync;
        /**
         * Cancel a download operation queued for an attachment
         * @param attachment
         */
        function cancelAttachmentDownloadAsync(attachment, callback) {
            KASClient.cancelAttachmentDownload(attachment.toJSON(), function (error) {
                if (callback) {
                    callback(error);
                }
            });
        }
        App.cancelAttachmentDownloadAsync = cancelAttachmentDownloadAsync;
        /**
        * Shows a native place picker, and returns the selected place (lt, lg, n)
        * @param {Callback} callback with below parameters:
        * * * * @param {KASLocation} selectedLocation can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function showPlacePickerAsync(callback) {
            KASClient.showPlacePicker(function (locationJson, error) {
                if (callback) {
                    callback(KASClient.KASLocation.fromJSON(locationJson), error);
                }
            });
        }
        App.showPlacePickerAsync = showPlacePickerAsync;
        /**
        * Shows a native duration picker with day/hour/minute
        * @param {number} defaultDurationInMinutes the default duration to be shown on picker
        * @param {Callback} callback with below parameters:
        * * * * @param {number} durationInMinutes selected duration in minutes
        * * * * @param {string} error message in case of error, null otherwise
        */
        function showDurationPickerAsync(defaultDurationInMinutes, callback) {
            KASClient.showDurationPicker(defaultDurationInMinutes, function (durationString, error) {
                if (callback) {
                    callback(parseInt(durationString), error);
                }
            });
        }
        App.showDurationPickerAsync = showDurationPickerAsync;
        /**
        * Gets the previously stored device location
        * @param {Callback} callback with below parameters:
        * * * * @param {string} location can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getDeviceLocationAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                KASClient.getJsonFromFileAsync("mock/location.json", function (locationJson, error) {
                    if (callback) {
                        callback(JSON.stringify(locationJson), null);
                    }
                });
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getLocation(callback);
        }
        App.getDeviceLocationAsync = getDeviceLocationAsync;
        /**
        * Gets the new UUID
        * @param {Callback} callback with below parameters:
        * * * * @param {string} uuid newly generated uuid
        * * * * @param {string} error message in case of error, null otherwise
        */
        function generateUUIDAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                callback(JSON.stringify(""), null);
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.generateUUID(callback);
        }
        App.generateUUIDAsync = generateUUIDAsync;
        function getUrlContentAsync(url, callback) {
            KASClient.getUrlContent(url, callback);
        }
        App.getUrlContentAsync = getUrlContentAsync;
        /**
        * Gets the current device location
        * @param {Callback} callback with below parameters:
        * * * * @param {string} location can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getCurrentDeviceLocationAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                KASClient.getJsonFromFileAsync("mock/location.json", function (locationJson, error) {
                    if (callback) {
                        callback(JSON.stringify(locationJson), null);
                    }
                });
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getCurrentLocation(callback);
        }
        App.getCurrentDeviceLocationAsync = getCurrentDeviceLocationAsync;
        /**
        * Shows a native alert (for iOS) or a toast (for Android) with the message
        * @param {string} message
        */
        function showNativeErrorMessage(message) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert(message);
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.showAlert(message);
        }
        App.showNativeErrorMessage = showNativeErrorMessage;
        /**
        * Gets the current app locale, the language in which the app is rendered, useful for localizing MiniApp's strings
        * @param {Callback} callback with below parameters:
        * * * * @param {string} locale can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getAppLocaleAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                if (callback) {
                    callback("en", null);
                }
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getAppLocale(callback);
        }
        App.getAppLocaleAsync = getAppLocaleAsync;
        /**
        * Gets all the participant-ids of the current conversation
        * @param {Callback} callback with below parameters:
        * * * * @param {string} name can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getConversationParticipantsCountAsync(callback) {
            KASClient.getConversationParticipantsCount(function (participantsCount, error) {
                if (callback) {
                    callback(parseInt(participantsCount), error);
                }
            });
        }
        App.getConversationParticipantsCountAsync = getConversationParticipantsCountAsync;
        /**
        * Gets the current conversation name
        * @param {Callback} callback with below parameters:
        * * * * @param {string} name can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getConversationNameAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                if (callback) {
                    callback("The Conversation", null);
                }
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getConversationName(callback);
        }
        App.getConversationNameAsync = getConversationNameAsync;
        /**
        * Dismiss the current screen (Creation, Response, or Summary)
        */
        function dismissCurrentScreen() {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("dismissCurrentScreen");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.dismissScreen();
        }
        App.dismissCurrentScreen = dismissCurrentScreen;
        /**
        * Shows a native full sreen progress bar with the given text
        * @param {string} text
        */
        function showProgressBar(text) {
            KASClient.showProgress(text);
        }
        App.showProgressBar = showProgressBar;
        /**
        * Hides the current progress bar, if any
        */
        function hideProgressBar() {
            KASClient.hideProgress();
        }
        App.hideProgressBar = hideProgressBar;
        /**
        * Gets the current user id who has opened the MiniApp
        * @param {Callback} callback with below parameters:
        * * * * @param {string} userId can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getCurrentUserIdAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                if (callback) {
                    callback("7dc6f31a-28ec-4c9b-91bb-ecf3ef5f4a0c", null);
                }
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getCurrentUserId(callback);
        }
        App.getCurrentUserIdAsync = getCurrentUserIdAsync;
        /**
        * Gets the package properties (user given)
        * @param {Callback} callback with below parameters:
        * * * * @param {JSON} properties can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getPackagePropertiesAsync(callback) {
            KASClient.getPackageProperties(callback);
        }
        App.getPackagePropertiesAsync = getPackagePropertiesAsync;
        /**
        * Shows Image in Immersive view.
        * @param {string[]} urls Array of images url:
        */
        function showImageImmersiveView(urls, currentImageIndex) {
            if (urls === void 0) { urls = []; }
            if (currentImageIndex === void 0) { currentImageIndex = 0; }
            KASClient.showImageInFullScreen(urls, currentImageIndex);
        }
        App.showImageImmersiveView = showImageImmersiveView;
        /**
        * Open attachment in Immersive view.
        * @param {KASAttachment} attachmentObj
        */
        function openAttachmentImmersiveView(attachmentObj) {
            KASClient.openImmersiveViewForAttachment(attachmentObj.toJSON());
        }
        App.openAttachmentImmersiveView = openAttachmentImmersiveView;
        /**
       * checks whether app has read/write access to the storage
       * @param {KASAttachmentType} attachmentType
       */
        function hasStorageAccessForAttachmentType(type, callback) {
            KASClient.hasStorageAccessForType(type, callback);
        }
        App.hasStorageAccessForAttachmentType = hasStorageAccessForAttachmentType;
        /**
        * Generates Base64 thumbnail for an image whose localPath is given
        * @param {string} localPath localPath for the imageAttachment whose thumbnail needs to be generated:
        */
        function generateBase64ThumbnailAsync(localPath, callback) {
            KASClient.generateBase64ThumbnailForAttachment(localPath, callback);
        }
        App.generateBase64ThumbnailAsync = generateBase64ThumbnailAsync;
        /**
         * Gets the font size multiplier for large text.
         * Current only required by iOS.
         */
        function getFontSizeMultiplierAsync(callback) {
            KASClient.getFontSizeMultiplier(callback);
        }
        App.getFontSizeMultiplierAsync = getFontSizeMultiplierAsync;
        /**
        * Gets the localized strings' dictionary based on current app locale.
        * Strings must be provided inside the package with names like: strings_en.json, strings_hi.json, etc.
        * @param {Callback} callback with below parameters:
        * * * * @param {JSON} strings can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getLocalizedStringsAsync(callback) {
            KASClient.getLocalizedMiniAppStrings(callback);
        }
        App.getLocalizedStringsAsync = getLocalizedStringsAsync;
        /**
        * Gets all the customization settings for a package (Used in case of Type-4 packages and their base).
        * @param {Callback} callback with below parameters:
        * * * * @param {JSON} settings can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getPackageCustomSettingsAsync(callback) {
            KASClient.getPackageCustomSettings(callback);
        }
        App.getPackageCustomSettingsAsync = getPackageCustomSettingsAsync;
        /**
        * Logs an error for "Send report"
        * @param {string} error string
        */
        function logError(error) {
            KASClient.logErrorNative(error);
        }
        App.logError = logError;
        /**
        * Logs data for "Send report"
        * @param {string} data string
        */
        function logToReport(data) {
            KASClient.logToReportNative(data);
        }
        App.logToReport = logToReport;
        /**
        * Checks if the current user an O365 subscriber
        * @param {Callback} callback with below parameters:
        * * * * @param {boolean} subscribed true if subscribed, false otherwise
        */
        function isCurrentUserO365SubscribedAsync(callback) {
            KASClient.isCurrentUserO365Subscribed(function (subscribed, error) {
                if (callback) {
                    callback(subscribed && error == null);
                }
            });
        }
        App.isCurrentUserO365SubscribedAsync = isCurrentUserO365SubscribedAsync;
        /**
        * Registers a callback to be executed on hardware back button press (for Android)
        * @param {Callback} callback to be executed
        */
        var hardwareBackPressCallback = null;
        function registerHardwareBackPressCallback(callback) {
            if (callback === void 0) { callback = null; }
            hardwareBackPressCallback = callback;
        }
        App.registerHardwareBackPressCallback = registerHardwareBackPressCallback;
        // Will be called from Android Activity's onBackPressed()
        function OnHardwareBackPress() {
            if (hardwareBackPressCallback) {
                hardwareBackPressCallback();
            }
        }
        App.OnHardwareBackPress = OnHardwareBackPress;
        /**
        * Initializes the localization strings' map
        * @param {Dictionary<StringId: Dictionary<Locale: StringValue>>} the strings' map
        * @param {Callback} callback with below parameters:
        * * * * @param {boolean} success denotes the success/failure of the initialization
        */
        var locInited = false;
        var locJson = null;
        var currentLocale = "en"; // Default
        function initLocalizationStringsAsync(strings, callback) {
            locJson = strings;
            getAppLocaleAsync(function (locale, error2) {
                if (!error2) {
                    currentLocale = locale;
                }
                locInited = (!error2);
                if (callback) {
                    callback(locInited);
                }
            });
        }
        App.initLocalizationStringsAsync = initLocalizationStringsAsync;
        var userStrings = null;
        function setUserStrings(strings) {
            if (strings === void 0) { strings = null; }
            userStrings = strings;
        }
        App.setUserStrings = setUserStrings;
        /**
        * Returns a string from the localized strings' file
        * @param {string} stringId
        */
        function getString(stringId) {
            if (!userStrings && (!locInited || !locJson)) {
                console.assert(false, "Valid localization file not initialized");
            }
            else {
                // First preference should always be to user provided strings
                if (userStrings && userStrings.hasOwnProperty(stringId) && userStrings[stringId]) {
                    return userStrings[stringId];
                }
                else if (locJson.hasOwnProperty(stringId)) {
                    if (locJson[stringId].hasOwnProperty(currentLocale)) {
                        return locJson[stringId][currentLocale];
                    }
                    else {
                        return locJson[stringId]["en"];
                    }
                }
                else {
                    return stringId;
                }
            }
        }
        App.getString = getString;
        /**
        * Returns a string.
        * @param {string} string denotes the formatted string. Specifier should be mentioned like {0},{1},{2}.....
        * @param {string[]} args array of arguments.
        */
        function printf(main) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var formatted = main;
            for (var i = 0; i < args.length; i++) {
                var regexp = new RegExp('\\{' + i + '\\}', 'gi');
                formatted = formatted.replace(regexp, args[i]);
            }
            return formatted;
        }
        App.printf = printf;
        // For internal use.
        function getCurrentLocale() {
            return currentLocale;
        }
        App.getCurrentLocale = getCurrentLocale;
    })(App = KASClient.App || (KASClient.App = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var Form;
    (function (Form) {
        //////////////////////////////
        /////// Chat card APIs ///////
        //////////////////////////////
        function sendChatCardTemplate(template) {
            KASClient.sendCardTemplate(template.toJSON());
        }
        Form.sendChatCardTemplate = sendChatCardTemplate;
        //////////////////////////////////
        /////// Creation flow APIs ///////
        //////////////////////////////////
        /**
        * Initializes and returns an empty form object based on the default form file present in the package
        * @param {Callback} callback with below parameters:
        * * * * @param {KASForm} form can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function initFormAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                KASClient.getJsonFromFileAsync("mock/form.json", function (formJson, error) {
                    if (callback) {
                        callback(KASClient.KASForm.fromJSON(formJson), null);
                    }
                });
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getSurveyJson(function (formJson, error) {
                if (callback) {
                    callback(KASClient.KASForm.fromJSON(formJson), error);
                }
            });
        }
        Form.initFormAsync = initFormAsync;
        /**
        * Submits the newly created form as a request. This results a new conversation card
        * @param {KASForm} form
        */
        function submitFormRequest(form, shouldInflate) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("SubmitFormRequest");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.createRequest(form.toJSON(), null, shouldInflate);
        }
        Form.submitFormRequest = submitFormRequest;
        /**
        * Submits the newly created form as a request. This results a new conversation card
        * @param {KASForm} form
        */
        function submitFormRequestWithoutDismiss(form, shouldInflate) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("submitFormRequestWithoutDismiss");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.createRequest(form.toJSON(), null, shouldInflate, false);
        }
        Form.submitFormRequestWithoutDismiss = submitFormRequestWithoutDismiss;
        /**
        * use for making changes in form fields like title, description and settings.
        */
        function updateForm(fields, shouldInflate, callback) {
            if (KASClient.shouldMockData()) {
                alert("updateForm");
                return;
            }
            KASClient.updateRequest(fields, null, shouldInflate, function (success, error) {
                if (callback) {
                    callback(success && error == null);
                }
            });
        }
        Form.updateForm = updateForm;
        //////////////////////////////////
        /////// Response flow APIs ///////
        //////////////////////////////////
        /**
        * Gets whether the current user can respond to the form
        * @param {Callback} callback with below parameters:
        * * * * @param {boolean} canRespond true if current user is allowed to respond
        */
        function canRespondToFormAsync(callback) {
            KASClient.canRespondToSurvey(function (canRespond, error) {
                if (callback) {
                    callback(canRespond && error == null);
                }
            });
        }
        Form.canRespondToFormAsync = canRespondToFormAsync;
        /**
        * Gets the form object associated with the conversation card
        * @param {Callback} callback with below parameters:
        * * * * @param {KASForm} form can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getFormAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                KASClient.getJsonFromFileAsync("mock/form.json", function (formJson, error) {
                    if (callback) {
                        callback(KASClient.KASForm.fromJSON(formJson), null);
                    }
                });
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getSurveyJson(function (formJson, error) {
                if (callback) {
                    callback(KASClient.KASForm.fromJSON(formJson), error);
                }
            });
        }
        Form.getFormAsync = getFormAsync;
        /**
        * Gets the status of the form associated with the conversation card
        * @param {Callback} callback with below parameters:
        * * * * @param {boolean} isActive true if the form is not yet expired
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getFormStatusAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                if (callback) {
                    callback(true, null);
                }
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getPollStatus(function (isActive, error) {
                if (callback) {
                    callback(isActive, error);
                }
            });
        }
        Form.getFormStatusAsync = getFormStatusAsync;
        /**
        * Gets all the responses of the current user against the form
        * @param {Callback} callback with below parameters:
        * * * * @param {KASFormResponse[]} responses can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getMyFormResponsesAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                KASClient.getJsonFromFileAsync("mock/form_response.json", function (responsesJson, error) {
                    var responses = [];
                    for (var i in responsesJson) {
                        responses.push(KASClient.KASFormResponse.fromJSON(responsesJson[i]));
                    }
                    if (callback) {
                        callback(responses, null);
                    }
                });
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getResponsesJson(function (responsesJson, error) {
                var responses = [];
                for (var i in responsesJson) {
                    responses.push(KASClient.KASFormResponse.fromJSON(responsesJson[i]));
                }
                if (callback) {
                    callback(responses, error);
                }
            });
        }
        Form.getMyFormResponsesAsync = getMyFormResponsesAsync;
        /**
        * Submits a new response against the form associated with the conversation card
        * This will dismiss the current screen
        * @param {JSON} questionToAnswerMap question id to answer mapping
        * @param {string} responseId to be filled if the current response is an edit/update to a previous one
        * @param {boolean} isEdit denotes if the current response is an edit/update to a previous one
        * @param {boolean} showInChatCanvas denotes if a separate chat card needs to be created for this response or not
        * @param {boolean} isAnonymous denotes if the response should be registered as anonymous or not
        */
        function sumbitFormResponse(questionToAnswerMap, responseId, isEdit, showInChatCanvas, isAnonymous) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("SumbitFormResponse");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.sendResponse(questionToAnswerMap, responseId, isEdit, showInChatCanvas, isAnonymous);
        }
        Form.sumbitFormResponse = sumbitFormResponse;
        /**
        * Submits a new response against the form associated with the conversation card
        * This won't dismiss the current screen
        * @param {JSON} questionToAnswerMap question id to answer mapping
        * @param {string} responseId to be filled if the current response is an edit/update to a previous one
        * @param {boolean} isEdit denotes if the current response is an edit/update to a previous one
        * @param {boolean} showInChatCanvas denotes if a separate chat card needs to be created for this response or not
        * @param {boolean} isAnonymous denotes if the response should be registered as anonymous or not
        */
        function sumbitFormResponseWithoutDismiss(questionToAnswerMap, responseId, isEdit, showInChatCanvas, isAnonymous) {
            KASClient.sendResponse(questionToAnswerMap, responseId, isEdit, showInChatCanvas, isAnonymous, false);
        }
        Form.sumbitFormResponseWithoutDismiss = sumbitFormResponseWithoutDismiss;
        /////////////////////////////////
        /////// Summary flow APIs ///////
        /////////////////////////////////
        /**
        * Gets whether the form summary is visible to the current user
        * @param {Callback} callback with below parameters:
        * * * * @param {boolean} shouldSeeSummary true if current user is allowed to see summary
        */
        function shouldSeeFormSummaryAsync(callback) {
            KASClient.shouldSeeSurveySummary(function (shouldSeeSummary, error) {
                if (callback) {
                    callback(shouldSeeSummary && error == null);
                }
            });
        }
        Form.shouldSeeFormSummaryAsync = shouldSeeFormSummaryAsync;
        /**
        * Gets flat responses by all the users, and processed summary from all the responses associated
        * with the form. It requires two callbacks:
        * @param {Callback} mostUpdatedCallback to immediately get the most updated summary from local database. It has below parameters:
        * * * * @param {KASFormFlatSummary} flatSummary can be null in case of error
        * * * * @param {KASFormProcessedSummary} processedSummary can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        * @param {Callback} notifyCallback to get notified with the latest summary fetched from server. It has below parameters:
        * * * * @param {KASFormFlatSummary} flatSummary can be null in case of error
        * * * * @param {KASFormProcessedSummary} processedSummary can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        *
        * This is useful when the network is flaky/disconnected, so that summary can
        * immediately be shown with the present data we have, but with an option to refresh
        * it later on arrival of latest data from server! None of the callbacks are mandatory,
        * so if 1st is nil, this method can be used to always fetch summary from server, and
        * if 2nd is nil, this can be used to always fetch summary from local database!
        */
        function getFormSummaryAsync(mostUpdatedCallback, notifyCallback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                KASClient.getJsonFromFileAsync("mock/form_summary.json", function (summaryJson, error) {
                    KASClient.getJsonFromFileAsync("mock/form_result.json", function (summaryResultJson, error) {
                        if (mostUpdatedCallback) {
                            mostUpdatedCallback(KASClient.KASFormFlatSummary.fromJSON(summaryJson, true), KASClient.KASFormProcessedSummary.fromJSON(summaryResultJson), null);
                        }
                    });
                });
                return;
            }
            //////////// ACTUAL ////////////
            getFormAsync(function (form, error) {
                if (error == null) {
                    var callback1 = null;
                    if (mostUpdatedCallback) {
                        callback1 = function (summaryJson, summaryResultJson, error) {
                            mostUpdatedCallback(KASClient.KASFormFlatSummary.fromJSON(summaryJson, form.isResponseAppended), KASClient.KASFormProcessedSummary.fromJSON(summaryResultJson), error);
                        };
                    }
                    var callback2 = null;
                    if (notifyCallback) {
                        callback2 = function (summaryJson, summaryResultJson, error) {
                            notifyCallback(KASClient.KASFormFlatSummary.fromJSON(summaryJson, form.isResponseAppended), KASClient.KASFormProcessedSummary.fromJSON(summaryResultJson), error);
                        };
                    }
                    KASClient.getSurveySummary(callback1, callback2);
                }
                else {
                    if (mostUpdatedCallback) {
                        mostUpdatedCallback(null, null, error);
                    }
                }
            });
        }
        Form.getFormSummaryAsync = getFormSummaryAsync;
        /**
        * Gets flat responses by all the users associated with the form (It is advised to use getFormSummary() instead of this)
        * @param {Callback} callback with below parameters:
        * * * * @param {KASFormFlatSummary} flatSummary can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getFlatFormSummaryAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                KASClient.getJsonFromFileAsync("mock/form_summary.json", function (summaryJson, error) {
                    if (callback) {
                        callback(KASClient.KASFormFlatSummary.fromJSON(summaryJson, true), null);
                    }
                });
                return;
            }
            //////////// ACTUAL ////////////
            getFormAsync(function (form, error) {
                if (error == null) {
                    KASClient.getSurveySummaryJson(function (summaryJson, error) {
                        if (callback) {
                            callback(KASClient.KASFormFlatSummary.fromJSON(summaryJson, form.isResponseAppended), error);
                        }
                    });
                }
                else {
                    if (callback) {
                        callback(null, error);
                    }
                }
            });
        }
        Form.getFlatFormSummaryAsync = getFlatFormSummaryAsync;
        /**
        * Gets processed summary from all the responses associated with the form (It is advised to use getFormSummary() instead of this)
        * @param {Callback} callback with below parameters:
        * * * * @param {KASFormProcessedSummary} processedSummary can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getProcessedFormSummaryAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                KASClient.getJsonFromFileAsync("mock/form_result.json", function (summaryResultJson, error) {
                    if (callback) {
                        callback(KASClient.KASFormProcessedSummary.fromJSON(summaryResultJson), null);
                    }
                });
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getSurveyResultJson(function (summaryResultJson, error) {
                if (callback) {
                    callback(KASClient.KASFormProcessedSummary.fromJSON(summaryResultJson), error);
                }
            });
        }
        Form.getProcessedFormSummaryAsync = getProcessedFormSummaryAsync;
        /**
        * Gets aggregated summary from all the responses associated with the form
        * @param {Callback} callback with below parameters:
        * * * * @param {KASFormAggregatedSummary} aggregatedSummary can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getAggregatedFormSummaryAsync(callback) {
            KASClient.getSurveyAggregatedSummaryJson(function (summaryJson, error) {
                if (callback) {
                    callback(KASClient.KASFormAggregatedSummary.fromJSON(summaryJson), error);
                }
            });
        }
        Form.getAggregatedFormSummaryAsync = getAggregatedFormSummaryAsync;
        /**
        * Gets the file url from server containing flat responses associated with the form
        * @param {Callback} callback with below parameters:
        * * * * @param {string} url can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getFormURLAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                if (callback) {
                    callback("https://www.kaizala.dummyurl", null);
                }
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getSurveyURL(function (url, error) {
                if (callback) {
                    callback(url, error);
                }
            });
        }
        Form.getFormURLAsync = getFormURLAsync;
        /**
        * Launches native share screen for the form url
        * @param {string} url to be shared
        */
        function shareFormURL(url) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("ShareFormURL");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.shareSurveyURL(url);
        }
        Form.shareFormURL = shareFormURL;
        /**
        * Gets the consolidated reaction (likes and comments) of the conversation card associated with the form
        * @param {Callback} callback with below parameters:
        * * * * @param {KASFormReaction} reaction can be null in case of error
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getFormReactionAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                KASClient.getJsonFromFileAsync("mock/form_reaction.json", function (reactionJson, error) {
                    if (callback) {
                        callback(KASClient.KASFormReaction.fromJSON(reactionJson), null);
                    }
                });
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getSurveyLikesAndComments(function (reactionJson, error) {
                if (callback) {
                    callback(KASClient.KASFormReaction.fromJSON(reactionJson), error);
                }
            });
        }
        Form.getFormReactionAsync = getFormReactionAsync;
        /**
        * Shows all the reaction screen (likes and comments) against the form
        */
        function showAllReactions() {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("ShowAllReactions");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.showLikesAndCommentsPage();
        }
        Form.showAllReactions = showAllReactions;
        /**
        * Requests to add a like count to a form, the count may decrease if the current user has already liked the form
        */
        function likeForm() {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("LikeForm");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.likeSurvey();
        }
        Form.likeForm = likeForm;
        /**
        * Requests to add a comment to a form
        */
        function addCommentOnForm(comment) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("CommentForm: " + comment);
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.addCommentOnSurvey(comment);
        }
        Form.addCommentOnForm = addCommentOnForm;
        /**
        * Requests to add a response to a form, by launching response screen
        */
        function respondToForm() {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("RespondToForm");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.respondToSurvey();
        }
        Form.respondToForm = respondToForm;
        /**
        * Sends a reminder (a new conversation card) against the existing card
        */
        function sendRemindersToRespond() {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("SendRemindersToRespond");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.sendReminder();
        }
        Form.sendRemindersToRespond = sendRemindersToRespond;
        /**
        * Launches the conversation picker to forward a copy of the existing form as a new conversation card
        */
        function copyFormAndForward() {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("CopyFormAndForward");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.forwardSurvey();
        }
        Form.copyFormAndForward = copyFormAndForward;
        /**
        * Closes the form associated with the card, no responses will be allowed further
        */
        function closeForm() {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("CloseForm");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.closeCard();
        }
        Form.closeForm = closeForm;
        /**
        * Editing the form associated with the card.
        */
        function showEditFormPage() {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("EditForm");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.editCard();
        }
        Form.showEditFormPage = showEditFormPage;
        /**
        * Post a request to update the properties associated with the form
        * @param {KASFormPropertyUpdateInfo[]} propertyUpdates an array of all update infos that are needed to be performed, update infos can be created using KASFormPropertyUpdateFactory
        * @param {string[]} notifyUsers send push notifications to these user ids regarding this update
        * @param {string} notificationMessage push notification message
        * @param {Callback} callback with below parameters:
        * * * * @param {boolean} success indicates if the update is successful or not
        */
        function updateFormPropertiesAsync(propertyUpdates, notifyUsers, notificationMessage, callback) {
            var updates = [];
            for (var i = 0; i < propertyUpdates.length; i++) {
                var propertyUpdate = propertyUpdates[i];
                updates.push(propertyUpdate.toJSON());
            }
            KASClient.updateSurveyMetadata([JSON.stringify(updates), JSON.stringify(notifyUsers), notificationMessage], function (success, error) {
                if (callback) {
                    callback(success && error == null);
                }
            });
        }
        Form.updateFormPropertiesAsync = updateFormPropertiesAsync;
        /**
        * Requests to get local properties of an action, if it exists
        * @param {Callback} callback with below parameters:
        * * * * @param {KASActionProperties} actionProperties local properties
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getLocalActionPropertiesAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("getLocalProperties");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getLocalProperties(function (propertiesJson, error) {
                if (callback) {
                    callback(KASClient.KASActionProperties.fromJSON(propertiesJson), error);
                }
            });
        }
        Form.getLocalActionPropertiesAsync = getLocalActionPropertiesAsync;
        /**
        * Requests to update local properties of an action, if it exists
        * @param {KASActionProperties} actionProperties properties to update
        * @param {Callback} callback with below parameters:
        * * * * @param {boolean} success indicates if the update is successful or not
        * * * * @param {string} error message in case of error, null otherwise
        */
        function updateLocalActionPropertiesAsync(actionProperties, callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("updateLocalProperties");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.updateLocalProperties(actionProperties.properties, function (success, error) {
                if (callback) {
                    callback(success, error);
                }
            });
        }
        Form.updateLocalActionPropertiesAsync = updateLocalActionPropertiesAsync;
        /**
        * Requests to get custom storage properties of a package, if it exists
        * @param {Callback} callback with below parameters:
        * * * * @param {KASActionPackageProperties} packageProperties package custom properties
        * * * * @param {string} error message in case of error, null otherwise
        */
        function getPackageCustomPropertiesAsync(callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("getPackageCustomProperties");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.getPackageCustomProperties(function (propertiesJson, error) {
                if (callback) {
                    callback(KASClient.KASActionPackageProperties.fromJSON(propertiesJson), error);
                }
            });
        }
        Form.getPackageCustomPropertiesAsync = getPackageCustomPropertiesAsync;
        /**
        * Requests to update custom storage properties of a package, if it exists
        * @param {KASActionPackageProperties} packageProperties package custom properties to update
        * @param {Callback} callback with below parameters:
        * * * * @param {boolean} success indicates if the update is successful or not
        * * * * @param {string} error message in case of error, null otherwise
        */
        function updatePackageCustomPropertiesAsync(packageProperties, callback) {
            //////////// MOCK ////////////
            if (KASClient.shouldMockData()) {
                alert("updatePackageCustomProperties");
                return;
            }
            //////////// ACTUAL ////////////
            KASClient.updatePackageCustomProperties(packageProperties.properties, function (success, error) {
                if (callback) {
                    callback(success, error);
                }
            });
        }
        Form.updatePackageCustomPropertiesAsync = updatePackageCustomPropertiesAsync;
    })(Form = KASClient.Form || (KASClient.Form = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var Internal;
    (function (Internal) {
        // Let's Meet + Job
        var kasClientStrings = null;
        function getMessagePropertiesAsync(callback) {
            KASClient.getMessageProperties(function (properties, error) {
                if (callback) {
                    callback(properties, error);
                }
            });
        }
        Internal.getMessagePropertiesAsync = getMessagePropertiesAsync;
        function createMeetingRequest(form, title, dueDate, duration, agenda, location) {
            if (location == null) {
                location = new KASClient.KASLocation();
            }
            KASClient.callNativeCommand(KASClient.CREATE_MEETING_REQUEST, [JSON.stringify(form.toJSON()), title, dueDate, duration, agenda, JSON.stringify(location.toJSON())]);
        }
        Internal.createMeetingRequest = createMeetingRequest;
        // Job
        function markJobComplete() {
            KASClient.Form.sumbitFormResponse(JSON.parse(JSON.stringify({ 0: 0 })), null, false, false, false);
        }
        Internal.markJobComplete = markJobComplete;
        function reassignJobAsync(callback) {
            KASClient.reassignJob(callback);
        }
        Internal.reassignJobAsync = reassignJobAsync;
        // Switching page in html internally
        function screenChanged(title) {
            if (title === void 0) { title = null; }
            KASClient.callNativeCommand(KASClient.SCREEN_CHANGED_COMMAND, [title]);
        }
        Internal.screenChanged = screenChanged;
        function getNativeIconsAsync(callback) {
            KASClient.getAssetPathsJson(callback);
        }
        Internal.getNativeIconsAsync = getNativeIconsAsync;
        function getNativeLocalizedStringsAsync(callback) {
            KASClient.getLocalizedStringsJson(callback);
        }
        Internal.getNativeLocalizedStringsAsync = getNativeLocalizedStringsAsync;
        function initialiseKASClientStrings() {
            KASClient.populateKASClientStrings(function (stringsJson) {
                kasClientStrings = stringsJson;
            });
        }
        Internal.initialiseKASClientStrings = initialiseKASClientStrings;
        function getKASClientString(stringId) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (kasClientStrings != null && kasClientStrings.hasOwnProperty(stringId)) {
                return KASClient.App.printf.apply(KASClient.App, [kasClientStrings[stringId]].concat(args));
            }
            return stringId;
        }
        Internal.getKASClientString = getKASClientString;
        function setFontSizeMultiplier() {
            if (KASClient.getPlatform() == KASClient.Platform.iOS) {
                KASClient.App.getFontSizeMultiplierAsync(function (multiplier, error) {
                    iOSFontSizeScaleMultiplier = parseFloat(multiplier);
                });
            }
        }
        Internal.setFontSizeMultiplier = setFontSizeMultiplier;
    })(Internal = KASClient.Internal || (KASClient.Internal = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var ActionDesigner;
    (function (ActionDesigner) {
        function callNativeCommand(command, args, successCallback, errorCallback) {
            if (args === void 0) { args = null; }
            if (successCallback === void 0) { successCallback = null; }
            if (errorCallback === void 0) { errorCallback = null; }
            var result = null;
            switch (command) {
                case KASClient.GET_CLIENT_SUPPORTED_SDK_VERSION_COMMAND:
                    result = ["9999"]; // All supported
                    break;
                case KASClient.OPEN_STORE_LINK_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.GET_SURVEY_JSON_COMMAND:
                    getMockData(["survey"], successCallback);
                    return;
                case KASClient.GET_SURVEY_SUMMARY_JSON_COMMAND:
                    getMockData(["surveyFlatSummary"], successCallback);
                    return;
                case KASClient.GET_SURVEY_AGGREGATED_SUMMARY_JSON_COMMAND:
                    getMockData(["surveyAggregatedSummary"], successCallback);
                    return;
                case KASClient.GET_SURVEY_RESULT_JSON_COMMAND:
                    getMockData(["surveyProcessedSummary"], successCallback);
                    return;
                case KASClient.GET_SURVEY_SUMMARY_WITH_NOTIFY_COMMAND:
                    getMockData(["surveyFlatSummary", "surveyProcessedSummary"], successCallback);
                    return;
                case KASClient.GET_SURVEY_URL_COMMAND:
                    getMockData(["surveyURL"], successCallback);
                    return;
                case KASClient.GET_RESPONSES_COMMAND:
                    getMockData(["myResponses"], successCallback);
                    return;
                case KASClient.GET_LIKES_AND_COMMENTS_DATA_COMMAND:
                    getMockData(["likesAndComments"], successCallback);
                    return;
                case KASClient.GET_ASSET_PATHS_COMMAND:
                    getMockData(["assetPaths"], successCallback);
                    return;
                case KASClient.GET_LOCALIZED_STRINGS_COMMAND:
                case KASClient.GET_LOCALIZED_MINIAPP_STRINGS:
                    getStrings(successCallback);
                    return;
                case KASClient.POPULATE_KASCLIENT_STRINGS:
                    var sdkStrings = window.parent["getKASClientSDKStrings"]();
                    result = [JSON.stringify(sdkStrings)];
                    break;
                case KASClient.GET_POLL_STATUS_COMMAND:
                    getMockData(["isSurveyActive"], successCallback);
                    return;
                case KASClient.GET_LOCATION_COMMAND:
                case KASClient.GET_CURRENT_LOCATION_COMMAND:
                case KASClient.SHOW_PLACE_PICKER:
                    getMockData(["currentLocation"], successCallback);
                    return;
                case KASClient.SHOW_ALERT_COMMAND:
                    alert(args[0]);
                    return;
                case KASClient.UPDATE_RESPONSE_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.GET_USER_DETAILS_COMMAND:
                    getMockData(["userDetails"], successCallback);
                    break;
                case KASClient.GET_INTEGERATION_SERVICE_TOKEN_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.GET_ATTACHMENT_PATH_COMMAND:
                    getMockData(["attachmentPath"], successCallback);
                    return;
                case KASClient.CREATE_REQUEST_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.CLOSE_CARD_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.SELECT_ASIGNEES_COMMAND:
                    getMockData(["assignees"], successCallback);
                    return;
                case KASClient.GET_APP_INFO_COMMAND:
                    getMockData(["appInfo"], successCallback);
                    return;
                case KASClient.GET_MESSAGE_PROPERTIES_COMMAND:
                    getMockData(["messageProperties"], successCallback);
                    return;
                case KASClient.SHOW_LIKES_AND_COMMENTS_PAGE_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.SHOW_IMAGE_FULL_SCREEN_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.RESPOND_TO_SURVEY_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.SEND_REMINDER_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.FORWARD_SURVEY_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.GET_CURRENT_USER_ID_COMMAND:
                    getMockData(["currentUserId"], successCallback);
                    return;
                case KASClient.ADD_LIKE_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.ADD_COMMENT_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.DISMISS_SCREEN_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.SHOW_PROGRESS_BAR_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.HIDE_PROGRESS_BAR_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.REASSIGN_JOB_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.SEND_SURVEY_URL_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.SCREEN_CHANGED_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.LOG_ERROR_COMMAND:
                    alert(args[0]);
                    break;
                case KASClient.GET_PACKAGE_PROPERTIES_COMMAND:
                    getMockData(["packageProperties"], successCallback);
                    return;
                case KASClient.SEND_CHAT_CARD_TEMPLATE:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.SHOULD_SEE_SURVEY_SUMMARY:
                    getMockData(["shouldSeeSurveySummary"], successCallback);
                    return;
                case KASClient.CAN_RESPOND_TO_SURVEY:
                    getMockData(["canRespondToSurvey"], successCallback);
                    return;
                case KASClient.IS_TALKBACK_ENABLED:
                    getMockData(["isTalkBackEnabled"], successCallback);
                    return;
                case KASClient.READ_TALKBACK_MESSAGE:
                    alert(args[0]);
                    break;
                case KASClient.LOG_TO_REPORT_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.CREATE_MEETING_REQUEST:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.EDIT_CARD_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.UPDATE_REQUEST_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.IS_CURRENT_USER_O365_SUBSCRIBED:
                    getMockData(["isO365Subscribed"], successCallback);
                    return;
                case KASClient.GET_CONVERSATION_NAME_COMMAND:
                    getMockData(["groupName"], successCallback);
                    return;
                case KASClient.GET_CONVERSATION_PARTICIPANTS_COUNT:
                    getMockData(["groupParticipantsCount"], successCallback);
                    return;
                case KASClient.SHOW_DURATION_PICKER:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.SELECT_ATTACHMENTS_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.DOWNLOAD_ATTACHMENT_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.CANCEL_ATTACHMENT_DOWNLOAD_COMMAND:
                    /* NOT SUPPORTED */
                    break;
                case KASClient.GET_PACKAGE_CUSTOM_SETTINGS:
                    getSettings(successCallback);
                    return;
                case KASClient.GET_UUID:
                    /* NOT SUPPORTED */
                    break;
                default:
            }
            callFunction(successCallback, result);
        }
        ActionDesigner.callNativeCommand = callNativeCommand;
        function getStrings(successCallback) {
            if (successCallback === void 0) { successCallback = null; }
            if (window.parent.hasOwnProperty("getPackageStrings")) {
                var strings = window.parent["getPackageStrings"]();
                callFunction(successCallback, [JSON.stringify(strings)]);
                return;
            }
            KASClient.getJsonFromFileAsync("strings_en.json", function (strings, error) {
                callFunction(successCallback, [JSON.stringify(strings)]);
            });
        }
        function getSettings(successCallback) {
            if (successCallback === void 0) { successCallback = null; }
            if (window.parent.hasOwnProperty("getPackageSettings")) {
                var settings = window.parent["getPackageSettings"]();
                callFunction(successCallback, [JSON.stringify(settings)]);
                return;
            }
            KASClient.getJsonFromFileAsync("settings.json", function (settings, error) {
                callFunction(successCallback, [JSON.stringify(settings)]);
            });
        }
        var mockData = null;
        function getMockData(dataKeys, successCallback) {
            if (successCallback === void 0) { successCallback = null; }
            if (mockData) {
                var result = [];
                for (var i = 0; i < dataKeys.length; i++) {
                    var key = dataKeys[i];
                    var value = mockData[key];
                    if (typeof value === "object") {
                        value = JSON.stringify(value);
                    }
                    else if (typeof value === "boolean" || typeof value === "number") {
                        value = "" + value;
                    }
                    result.push(value);
                }
                callFunction(successCallback, result);
            }
            else {
                KASClient.getJsonFromFileAsync("mockData.json", function (data, error) {
                    mockData = data;
                    getMockData(dataKeys, successCallback);
                });
            }
        }
        function callFunction(func, params) {
            if (params === void 0) { params = null; }
            if (func) {
                if (params) {
                    KASClient.executeFunction(func, params);
                }
                else {
                    KASClient.executeFunction(func);
                }
            }
        }
    })(ActionDesigner = KASClient.ActionDesigner || (KASClient.ActionDesigner = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var Android;
    (function (Android) {
        function callNativeCommand(command, args, successCallback, errorCallback) {
            if (args === void 0) { args = null; }
            if (successCallback === void 0) { successCallback = null; }
            if (errorCallback === void 0) { errorCallback = null; }
            if (KASClient.Version.clientSupports(KASClient.Version.VERSION_3_1, true /* considerMinorVersion */)) {
                callNativeCommandAsync(command, args, successCallback, errorCallback);
            }
            else {
                callNativeCommandSync(command, args, successCallback, errorCallback);
            }
        }
        Android.callNativeCommand = callNativeCommand;
        function callNativeCommandAsync(command, args, successCallback, errorCallback) {
            if (args === void 0) { args = null; }
            if (successCallback === void 0) { successCallback = null; }
            if (errorCallback === void 0) { errorCallback = null; }
            switch (command) {
                case KASClient.GET_CLIENT_SUPPORTED_SDK_VERSION_COMMAND:
                case KASClient.OPEN_STORE_LINK_COMMAND:
                case KASClient.SHOW_ALERT_COMMAND:
                case KASClient.UPDATE_RESPONSE_COMMAND:
                case KASClient.CREATE_REQUEST_COMMAND:
                case KASClient.CLOSE_CARD_COMMAND:
                case KASClient.SHOW_LIKES_AND_COMMENTS_PAGE_COMMAND:
                case KASClient.SHOW_IMAGE_FULL_SCREEN_COMMAND:
                case KASClient.RESPOND_TO_SURVEY_COMMAND:
                case KASClient.SEND_REMINDER_COMMAND:
                case KASClient.FORWARD_SURVEY_COMMAND:
                case KASClient.ADD_LIKE_COMMAND:
                case KASClient.DISMISS_SCREEN_COMMAND:
                case KASClient.SHOW_PROGRESS_BAR_COMMAND:
                case KASClient.HIDE_PROGRESS_BAR_COMMAND:
                case KASClient.SEND_SURVEY_URL_COMMAND:
                case KASClient.SCREEN_CHANGED_COMMAND:
                case KASClient.LOG_ERROR_COMMAND:
                case KASClient.SEND_CHAT_CARD_TEMPLATE:
                case KASClient.ADD_COMMENT_COMMAND:
                case KASClient.SHOULD_SEE_SURVEY_SUMMARY:
                case KASClient.CAN_RESPOND_TO_SURVEY:
                case KASClient.IS_TALKBACK_ENABLED:
                case KASClient.READ_TALKBACK_MESSAGE:
                case KASClient.LOG_TO_REPORT_COMMAND:
                case KASClient.CREATE_MEETING_REQUEST:
                case KASClient.EDIT_CARD_COMMAND:
                case KASClient.UPDATE_REQUEST_COMMAND:
                case KASClient.OPEN_IMMERSIVE_VIEW_FOR_ATTACHMENT:
                case KASClient.GET_UUID:
                    // For these commands, we don't need an Async API
                    callNativeCommandSync(command, args, successCallback, errorCallback);
                    break;
                case KASClient.GET_SURVEY_JSON_COMMAND:
                    KaizalaPlatform.getValueAsync(successCallback, errorCallback, "surveyJson");
                    return;
                case KASClient.GET_SURVEY_SUMMARY_JSON_COMMAND:
                    KaizalaPlatform.getValueAsync(successCallback, errorCallback, "surveySummaryJson");
                    return;
                case KASClient.GET_SURVEY_AGGREGATED_SUMMARY_JSON_COMMAND:
                    KaizalaPlatform.getSurveyAggregatedSummaryAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_SURVEY_RESULT_JSON_COMMAND:
                    KaizalaPlatform.getSurveySummaryResultAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_SURVEY_SUMMARY_WITH_NOTIFY_COMMAND:
                    KaizalaPlatform.getSurveySummaryAsync(args[0], args[1]);
                    return; // As the callbacks are already handled, lets return
                case KASClient.GET_SURVEY_URL_COMMAND:
                    KaizalaPlatform.getSurveyURLAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_RESPONSES_COMMAND:
                    KaizalaPlatform.getValueAsync(successCallback, errorCallback, "frsps");
                    return;
                case KASClient.GET_LIKES_AND_COMMENTS_DATA_COMMAND:
                    KaizalaPlatform.getLikesAndCommentsAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_ASSET_PATHS_COMMAND:
                    KaizalaPlatform.getAssetPathsAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_LOCALIZED_STRINGS_COMMAND:
                    KaizalaPlatform.getLocalizedStringsAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_POLL_STATUS_COMMAND:
                    KaizalaPlatform.getPollStatusAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_LOCATION_COMMAND:
                    KaizalaPlatform.getCurrentLocationAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_CURRENT_LOCATION_COMMAND:
                    KaizalaPlatform.getCurrentLocationAsyncV2(successCallback, errorCallback);
                    return;
                case KASClient.GET_USER_DETAILS_COMMAND:
                    KaizalaPlatform.getUserDetailsAsync(successCallback, errorCallback, JSON.stringify(args));
                    return;
                case KASClient.GET_INTEGERATION_SERVICE_TOKEN_COMMAND:
                    KaizalaPlatform.getIntegerationServiceToken(successCallback, errorCallback);
                    break;
                case KASClient.GET_DEVICE_ID_COMMAND:
                    KaizalaPlatform.getDeviceId(successCallback, errorCallback);
                    break;
                case KASClient.GET_CONVERSATION_NAME_COMMAND:
                    KaizalaPlatform.getConversationNameAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_ATTACHMENT_PATH_COMMAND:
                    KaizalaPlatform.getAttachmentPathAsync(successCallback, errorCallback);
                    return;
                case KASClient.SELECT_ASIGNEES_COMMAND:
                    KaizalaPlatform.selectAssigneeAsync(args[0], args[1], args[2], args[3], successCallback, errorCallback);
                    return;
                case KASClient.GET_APP_INFO_COMMAND:
                    KaizalaPlatform.getAppInfoAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_MESSAGE_PROPERTIES_COMMAND:
                    KaizalaPlatform.getMessagePropertiesAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_CURRENT_USER_ID_COMMAND:
                    KaizalaPlatform.getUserIdAsync(successCallback, errorCallback);
                    return;
                case KASClient.REASSIGN_JOB_COMMAND:
                    KaizalaPlatform.reassignJobAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_PACKAGE_PROPERTIES_COMMAND:
                    KaizalaPlatform.getPackagePropertiesAsync(successCallback, errorCallback);
                    return;
                case KASClient.UPDATE_SURVEY_METADATA:
                    KaizalaPlatform.updateSurveyMetadata(args, successCallback, errorCallback);
                    return;
                case KASClient.GET_LOCALIZED_MINIAPP_STRINGS:
                    KaizalaPlatform.getLocalizedMiniAppStrings(successCallback, errorCallback);
                    return;
                case KASClient.POPULATE_KASCLIENT_STRINGS:
                    KaizalaPlatform.populateKASClientStrings(successCallback, errorCallback);
                    return;
                case KASClient.IS_CURRENT_USER_O365_SUBSCRIBED:
                    KaizalaPlatform.isCurrentUserO365Subscribed(successCallback, errorCallback);
                    return;
                case KASClient.GET_CONVERSATION_PARTICIPANTS_COUNT:
                    KaizalaPlatform.getConversationParticipantsCountAsync(successCallback, errorCallback);
                    return;
                case KASClient.SHOW_PLACE_PICKER:
                    KaizalaPlatform.showPlacePickerAsync(successCallback, errorCallback);
                    return;
                case KASClient.SHOW_DURATION_PICKER:
                    KaizalaPlatform.showDurationPickerAsync(args[0], successCallback, errorCallback);
                    return;
                case KASClient.SELECT_ATTACHMENTS_COMMAND:
                    KaizalaPlatform.selectAttachmentsAsync(JSON.stringify(args[0]), args[1], successCallback, errorCallback);
                    return;
                case KASClient.DOWNLOAD_ATTACHMENT_COMMAND:
                    KaizalaPlatform.downloadAttachmentAsync(JSON.stringify(args[0]), successCallback, errorCallback);
                    return;
                case KASClient.CANCEL_ATTACHMENT_DOWNLOAD_COMMAND:
                    KaizalaPlatform.cancelAttachmentDownloadAsync(JSON.stringify(args[0]), successCallback, errorCallback);
                    return;
                case KASClient.GENERATE_THUMBNAIL_FOR_IMAGE_ATTACHMENT:
                    KaizalaPlatform.generateBase64ThumbnailForAttachmentAsync(args[0], successCallback, errorCallback);
                    return;
                case KASClient.CHECK_STORAGE_ACCESS_FOR_ATTACHMENTS:
                    KaizalaPlatform.checkStoragePermissionAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_LOCAL_PROPERTIES:
                    KaizalaPlatform.getLocalActionPropertiesAsync(successCallback, errorCallback);
                    return;
                case KASClient.UPDATE_LOCAL_PROPERTIES:
                    KaizalaPlatform.updateLocalActionPropertiesAsync(args[0], successCallback, errorCallback);
                    return;
                case KASClient.GET_PACKAGE_CUSTOM_SETTINGS:
                    KaizalaPlatform.getPackageCustomSettings(successCallback, errorCallback);
                    return;
                case KASClient.GET_PACKAGE_CUSTOM_PROPERTIES:
                    KaizalaPlatform.getPackageCustomProperties(successCallback, errorCallback);
                    return;
                case KASClient.UPDATE_PACKAGE_CUSTOM_PROPERTIES:
                    KaizalaPlatform.updatePackageCustomProperties(args[0], successCallback, errorCallback);
                    return;
                default:
            }
        }
        function callNativeCommandSync(command, args, successCallback, errorCallback) {
            if (args === void 0) { args = null; }
            if (successCallback === void 0) { successCallback = null; }
            if (errorCallback === void 0) { errorCallback = null; }
            var result = null;
            switch (command) {
                case KASClient.GET_UUID:
                    result = [KaizalaPlatform.generateUUID()];
                    break;
                case KASClient.GET_CLIENT_SUPPORTED_SDK_VERSION_COMMAND:
                    result = [KaizalaPlatform.getSupportedSDKVersion()];
                    break;
                case KASClient.OPEN_STORE_LINK_COMMAND:
                    KaizalaPlatform.openStoreLink();
                    break;
                case KASClient.GET_SURVEY_JSON_COMMAND:
                    result = [KaizalaPlatform.getValue("surveyJson")];
                    break;
                case KASClient.GET_SURVEY_SUMMARY_JSON_COMMAND:
                    result = [KaizalaPlatform.getValue("surveySummaryJson")];
                    break;
                case KASClient.GET_SURVEY_AGGREGATED_SUMMARY_JSON_COMMAND:
                    result = [KaizalaPlatform.getSurveyAggregatedSummary()];
                    break;
                case KASClient.GET_SURVEY_RESULT_JSON_COMMAND:
                    result = [KaizalaPlatform.getSurveySummaryResult()];
                    // Handling internet off scenario, so that HTML
                    // will load the error page
                    if (result == null || result[0] == null || result[0] == "") {
                        if (errorCallback) {
                            KASClient.executeFunction(errorCallback, ["Could not get required data"]);
                        }
                        return;
                    }
                    break;
                case KASClient.GET_SURVEY_SUMMARY_WITH_NOTIFY_COMMAND:
                    KaizalaPlatform.getSurveySummary(args[0], args[1]);
                    return; // As the callbacks are already handled, lets return
                case KASClient.GET_SURVEY_URL_COMMAND:
                    KaizalaPlatform.getSurveyURL(successCallback, errorCallback);
                    return; // As the callbacks are already handled, lets return
                case KASClient.GET_RESPONSES_COMMAND:
                    result = [KaizalaPlatform.getValue("frsps")];
                    break;
                case KASClient.GET_LIKES_AND_COMMENTS_DATA_COMMAND:
                    result = [KaizalaPlatform.getLikesAndCommentsDataWithError()];
                    break;
                case KASClient.GET_ASSET_PATHS_COMMAND:
                    result = [KaizalaPlatform.getAssetPaths()];
                    break;
                case KASClient.GET_LOCALIZED_STRINGS_COMMAND:
                    result = [KaizalaPlatform.getLocalizedStrings()];
                    break;
                case KASClient.GET_POLL_STATUS_COMMAND:
                    result = [KaizalaPlatform.getPollStatus()];
                    break;
                case KASClient.GET_CURRENT_LOCATION_COMMAND:
                    result = [KaizalaPlatform.getCurrentLocation()];
                    break;
                case KASClient.SHOW_ALERT_COMMAND:
                    KaizalaPlatform.showToast(args[0]);
                    break;
                case KASClient.UPDATE_RESPONSE_COMMAND:
                    KaizalaPlatform.updateMyResponse(JSON.stringify(args[0]), args[1], args[2], args[3], args[4] /*, args[5] */);
                    break;
                case KASClient.GET_USER_DETAILS_COMMAND:
                    result = [KaizalaPlatform.getUserDetails(JSON.stringify(args))];
                    break;
                case KASClient.GET_CONVERSATION_NAME_COMMAND:
                    result = [KaizalaPlatform.getConversationName()];
                    break;
                case KASClient.GET_ATTACHMENT_PATH_COMMAND:
                    result = [KaizalaPlatform.getAttachmentPath()];
                    break;
                case KASClient.CREATE_REQUEST_COMMAND:
                    KaizalaPlatform.createRequest(args[0], args[1], args[2], args[3]);
                    break;
                case KASClient.CLOSE_CARD_COMMAND:
                    KaizalaPlatform.closeCard();
                    break;
                case KASClient.SELECT_ASIGNEES_COMMAND:
                    result = [KaizalaPlatform.selectAssignee(args[0], args[1], args[2], args[3])];
                    break;
                case KASClient.GET_APP_INFO_COMMAND:
                    result = [KaizalaPlatform.getAppInfo()];
                    break;
                case KASClient.GET_MESSAGE_PROPERTIES_COMMAND:
                    result = [KaizalaPlatform.getMessageProperties()];
                    break;
                case KASClient.SHOW_LIKES_AND_COMMENTS_PAGE_COMMAND:
                    KaizalaPlatform.showLikesAndCommentsPage();
                    break;
                case KASClient.SHOW_IMAGE_FULL_SCREEN_COMMAND:
                    KaizalaPlatform.showImageImmersiveView(args[0], args[1]);
                    break;
                case KASClient.RESPOND_TO_SURVEY_COMMAND:
                    KaizalaPlatform.respondToSurvey();
                    break;
                case KASClient.SEND_REMINDER_COMMAND:
                    KaizalaPlatform.sendReminder();
                    break;
                case KASClient.FORWARD_SURVEY_COMMAND:
                    KaizalaPlatform.forwardSurvey();
                    break;
                case KASClient.GET_CURRENT_USER_ID_COMMAND:
                    result = [KaizalaPlatform.getUserId()];
                    break;
                case KASClient.ADD_LIKE_COMMAND:
                    KaizalaPlatform.addLike();
                    break;
                case KASClient.ADD_COMMENT_COMMAND:
                    KaizalaPlatform.addComment(args[0]);
                    break;
                case KASClient.DISMISS_SCREEN_COMMAND:
                    KaizalaPlatform.dismissActivity();
                    break;
                case KASClient.SHOW_PROGRESS_BAR_COMMAND:
                    KaizalaPlatform.showProgressBar();
                    break;
                case KASClient.HIDE_PROGRESS_BAR_COMMAND:
                    KaizalaPlatform.hideProgressBar();
                    break;
                case KASClient.REASSIGN_JOB_COMMAND:
                    result = [KaizalaPlatform.reassignJob()];
                    break;
                case KASClient.SEND_SURVEY_URL_COMMAND:
                    KaizalaPlatform.sendUrl(args[0]);
                    break;
                case KASClient.SCREEN_CHANGED_COMMAND:
                    KaizalaPlatform.sendScreenChange();
                    break;
                case KASClient.LOG_ERROR_COMMAND:
                    KaizalaPlatform.logError(args[0]);
                    break;
                case KASClient.GET_PACKAGE_PROPERTIES_COMMAND:
                    result = [KaizalaPlatform.getPackageProperties()];
                    break;
                case KASClient.SEND_CHAT_CARD_TEMPLATE:
                    KaizalaPlatform.sendChatCardTemplate(args[0]);
                    break;
                case KASClient.SHOULD_SEE_SURVEY_SUMMARY:
                    result = [KaizalaPlatform.shouldSeeSurveySummary()];
                    break;
                case KASClient.CAN_RESPOND_TO_SURVEY:
                    result = [KaizalaPlatform.canRespondToSurvey()];
                    break;
                case KASClient.IS_TALKBACK_ENABLED:
                    result = [KaizalaPlatform.isTalkBackEnabled()];
                    break;
                case KASClient.READ_TALKBACK_MESSAGE:
                    KaizalaPlatform.readTalkBackMessage(args[0]);
                    break;
                case KASClient.LOG_TO_REPORT_COMMAND:
                    KaizalaPlatform.logToReport(args[0]);
                    break;
                case KASClient.CREATE_MEETING_REQUEST:
                    KaizalaPlatform.createMeetingRequest(args[0], args[1], args[2], args[3], args[4], args[5]);
                    break;
                case KASClient.EDIT_CARD_COMMAND:
                    KaizalaPlatform.editCard();
                    return;
                case KASClient.UPDATE_REQUEST_COMMAND:
                    result = [KaizalaPlatform.updateSurvey(args[0], successCallback, errorCallback)];
                    break;
                case KASClient.OPEN_IMMERSIVE_VIEW_FOR_ATTACHMENT:
                    KaizalaPlatform.openImmersiveViewForAttachment(JSON.stringify(args[0]));
                    return;
                default:
            }
            if (successCallback) {
                if (result) {
                    KASClient.executeFunction(successCallback, result);
                }
                else {
                    KASClient.executeFunction(successCallback);
                }
            }
        }
    })(Android = KASClient.Android || (KASClient.Android = {}));
})(KASClient || (KASClient = {}));
var __NO_HTML__ = false;
var KASClient;
(function (KASClient) {
    KASClient.GET_SURVEY_JSON_COMMAND = "getSurveyJson";
    KASClient.GET_SURVEY_SUMMARY_JSON_COMMAND = "getSurveySummaryJson";
    KASClient.GET_SURVEY_AGGREGATED_SUMMARY_JSON_COMMAND = "getSurveyAggregatedSummaryJson";
    KASClient.GET_SURVEY_RESULT_JSON_COMMAND = "getSurveyResultJson";
    KASClient.GET_SURVEY_SUMMARY_WITH_NOTIFY_COMMAND = "getSurveySummaryWithNotify";
    KASClient.GET_SURVEY_URL_COMMAND = "getSurveyURL";
    KASClient.GET_RESPONSES_COMMAND = "getResponses";
    KASClient.GET_LIKES_AND_COMMENTS_DATA_COMMAND = "getLikesAndCommentsData";
    KASClient.GET_ASSET_PATHS_COMMAND = "getAssetPaths";
    KASClient.GET_LOCALIZED_STRINGS_COMMAND = "getLocalizedStrings";
    KASClient.POPULATE_KASCLIENT_STRINGS = "populateKASClientStrings";
    KASClient.GET_POLL_STATUS_COMMAND = "getPollStatus";
    KASClient.GET_LOCATION_COMMAND = "getCurrentLocation";
    KASClient.GET_CURRENT_LOCATION_COMMAND = "getCurrentLocationV2";
    KASClient.GET_USER_DETAILS_COMMAND = "getUserDetails";
    KASClient.GET_CONVERSATION_NAME_COMMAND = "getConversationName";
    KASClient.GET_APP_INFO_COMMAND = "getAppInfo";
    KASClient.GET_ATTACHMENT_PATH_COMMAND = "getAttachmentPath";
    KASClient.SELECT_ASIGNEES_COMMAND = "selectAssignees";
    KASClient.CLOSE_CARD_COMMAND = "closeCard";
    KASClient.SHOW_ALERT_COMMAND = "showAlert";
    KASClient.CREATE_REQUEST_COMMAND = "createRequest";
    KASClient.UPDATE_RESPONSE_COMMAND = "updateResponse";
    KASClient.SHOW_LIKES_AND_COMMENTS_PAGE_COMMAND = "showLikesAndCommentsPage";
    KASClient.SHOW_IMAGE_FULL_SCREEN_COMMAND = "showImageInFullScreen";
    KASClient.RESPOND_TO_SURVEY_COMMAND = "respondToSurvey";
    KASClient.SEND_REMINDER_COMMAND = "sendReminder";
    KASClient.FORWARD_SURVEY_COMMAND = "forwardSurvey";
    KASClient.ADD_LIKE_COMMAND = "addLike";
    KASClient.ADD_COMMENT_COMMAND = "addComment";
    KASClient.DISMISS_SCREEN_COMMAND = "dismissScreen";
    KASClient.SHOW_PROGRESS_BAR_COMMAND = "showProgressBar";
    KASClient.HIDE_PROGRESS_BAR_COMMAND = "hideProgressBar";
    KASClient.SEND_SURVEY_URL_COMMAND = "sendSurveyURL";
    KASClient.GET_CURRENT_USER_ID_COMMAND = "getCurrentUserId";
    KASClient.GET_MESSAGE_PROPERTIES_COMMAND = "getMessageProperties";
    KASClient.REASSIGN_JOB_COMMAND = "reassignJob";
    KASClient.SCREEN_CHANGED_COMMAND = "screenChanged";
    KASClient.LOG_ERROR_COMMAND = "logError";
    KASClient.GET_PACKAGE_PROPERTIES_COMMAND = "getPackageProperties";
    KASClient.GET_CLIENT_SUPPORTED_SDK_VERSION_COMMAND = "getClientSupportedSDKVersion";
    KASClient.OPEN_STORE_LINK_COMMAND = "openStoreLink";
    KASClient.SEND_CHAT_CARD_TEMPLATE = "sendChatCardTemplate";
    KASClient.UPDATE_SURVEY_METADATA = "updateSurveyMetadata";
    KASClient.GET_LOCALIZED_MINIAPP_STRINGS = "getLocalizedMiniAppStrings";
    KASClient.SHOULD_SEE_SURVEY_SUMMARY = "shouldSeeSurveySummary";
    KASClient.CAN_RESPOND_TO_SURVEY = "canRespondToSurvey";
    KASClient.IS_TALKBACK_ENABLED = "isTalkBackEnabled";
    KASClient.READ_TALKBACK_MESSAGE = "readTalkBackMessage";
    KASClient.LOG_TO_REPORT_COMMAND = "logToReport";
    KASClient.IS_CURRENT_USER_O365_SUBSCRIBED = "isCurrentUserO365Subscribed";
    KASClient.CREATE_MEETING_REQUEST = "createMeetingRequest";
    KASClient.GET_CONVERSATION_PARTICIPANTS_COUNT = "getConversationParticipantsCount";
    KASClient.SHOW_PLACE_PICKER = "showPlacePicker";
    KASClient.SHOW_DURATION_PICKER = "showDurationPicker";
    KASClient.EDIT_CARD_COMMAND = "editCard";
    KASClient.UPDATE_REQUEST_COMMAND = "updateRequest";
    KASClient.GET_INTEGERATION_SERVICE_TOKEN_COMMAND = "getIntegerationServiceToken";
    KASClient.GET_FONT_SIZE_MULTIPIER = "getFontSizeMultiplier";
    KASClient.SELECT_ATTACHMENTS_COMMAND = "selectAttachments";
    KASClient.DOWNLOAD_ATTACHMENT_COMMAND = "downloadAttachment";
    KASClient.CANCEL_ATTACHMENT_DOWNLOAD_COMMAND = "cancelAttachmentDownload";
    KASClient.OPEN_IMMERSIVE_VIEW_FOR_ATTACHMENT = "openImmersiveViewForAttachment";
    KASClient.GENERATE_THUMBNAIL_FOR_IMAGE_ATTACHMENT = "generateBase64ThumbnailForAttachment";
    KASClient.CHECK_STORAGE_ACCESS_FOR_ATTACHMENTS = "checkStorageAccessForAttachmentType";
    KASClient.GET_LOCAL_PROPERTIES = "getLocalActionProperties";
    KASClient.UPDATE_LOCAL_PROPERTIES = "updateLocalActionProperties";
    KASClient.GET_PACKAGE_CUSTOM_SETTINGS = "getPackageCustomSettings";
    KASClient.GET_PACKAGE_CUSTOM_PROPERTIES = "getPackageCustomProperties";
    KASClient.UPDATE_PACKAGE_CUSTOM_PROPERTIES = "updatePackageCustomProperties";
    KASClient.GET_DEVICE_ID_COMMAND = "getDeviceId";
    KASClient.GET_UUID = "generateUUID";
    KASClient.GET_URL_CONTENT = "getUrlContent";
    // Note: If you are adding new commands here, please increment
    // the supported SDK version in clients as well as add details
    // of that version in VersionUtil.ts
    ///////////////////////////////////////////////////////
    // A correlationId is required to distinguish between
    // two consequtive calls for the same command, 
    // cause just saving the callback for each call (before
    // calling the corresponding native method) can
    // override the callback of the previous one!
    var callbackForCorrelationId = JSON.parse("{}");
    function getCorrelationId() {
        // Assume date-time in millieseconds as a guid
        var id = "" + (new Date()).getTime();
        // Don't just assume, detect and resolve collision:
        // Check if that correlation id is already taken or not
        while (callbackForCorrelationId.hasOwnProperty(id)) {
            var randomNumber = Math.floor(Math.random() * 10000);
            id += randomNumber;
        }
        // Now we can say, we have a unique correlation id
        return id;
    }
    function getCorrelationIdForCallback(callback, internalSuccessCallbackName, internalErrorCallbackName) {
        if (internalSuccessCallbackName === void 0) { internalSuccessCallbackName = null; }
        if (internalErrorCallbackName === void 0) { internalErrorCallbackName = "onError"; }
        // Get a unique correlation id for this callback
        var correlationId = getCorrelationId();
        // Save the callback against that correlation id
        callbackForCorrelationId[correlationId] = callback;
        if (internalSuccessCallbackName) {
            // Create a new internal success callback against this correlation id
            KASClient[internalSuccessCallbackName + correlationId] = KASClient[internalSuccessCallbackName].bind(this, correlationId);
            // Update the internal success callback with correlation id
            internalSuccessCallbackName = "KASClient." + internalSuccessCallbackName + correlationId;
        }
        if (internalErrorCallbackName) {
            // Create a new internal error callback against correlation id
            KASClient[internalErrorCallbackName + correlationId] = KASClient[internalErrorCallbackName].bind(this, correlationId);
            // Update the internal error callback with correlation id
            internalErrorCallbackName = "KASClient." + internalErrorCallbackName + correlationId;
        }
        // Return the new correlation id, success, and error callbacks
        return JSON.parse(JSON.stringify({
            "correlationId": correlationId,
            "successCallback": internalSuccessCallbackName,
            "errorCallback": internalErrorCallbackName
        }));
    }
    function executeCallback(correlationId, args) {
        if (callbackForCorrelationId.hasOwnProperty(correlationId)) {
            // Get the callback associated with that correlation id
            var callback = callbackForCorrelationId[correlationId];
            // Now free that correlation slot ASAP
            delete callbackForCorrelationId[correlationId];
            // Call the callback with arguments
            if (callback) {
                callback.apply(this, args);
            }
        }
    }
    // By default we cannot sanitize all the HTML tags in
    // the results of all JS callbacks. Otherwise unwanted
    // issues may arrive. Like while getting the localized
    // strings for a MiniApp, all the HTML tags that we
    // put ourselves (like <b> to make strings bold) would
    // also be sanitized. We should only sanitize those
    // data which involves user input, like Survey/Response.
    var callbacksToSanitize = [];
    function sanitizeCallback(callbackId) {
        callbacksToSanitize.push(callbackId);
    }
    function shouldSanitizeCallback(callbackId) {
        if (callbacksToSanitize.indexOf(callbackId) >= 0) {
            return true;
        }
        return false;
    }
    ///////////////////////////////////////////////////////
    // All error callbacks are like this
    function onError(correlationId, errorCode) {
        convertErrorCodeToStringAsync(errorCode, function (errorString) {
            executeCallback(correlationId, [null, errorString]);
        });
    }
    KASClient.onError = onError;
    ///////////////////////////////////////////////////////
    // Internal success callback for JsonCallback type
    function onGetJson(correlationId, jsonString) {
        if (jsonString === void 0) { jsonString = null; }
        var json = null;
        if (jsonString != null) {
            if (shouldSanitizeCallback(correlationId)) {
                jsonString = KASClient.sanitizeHtmlTags(jsonString);
            }
            json = KASClient.parseJsonObject(jsonString);
        }
        executeCallback(correlationId, [json, null]);
    }
    KASClient.onGetJson = onGetJson;
    // Internal success callback for DoubleJsonCallback type
    function onGetDoubleJson(correlationId, jsonString1, jsonString2, error) {
        if (jsonString1 === void 0) { jsonString1 = null; }
        if (jsonString2 === void 0) { jsonString2 = null; }
        if (error === void 0) { error = null; }
        var json1 = null;
        if (jsonString1 != null) {
            if (shouldSanitizeCallback(correlationId)) {
                jsonString1 = KASClient.sanitizeHtmlTags(jsonString1);
            }
            json1 = KASClient.parseJsonObject(jsonString1);
        }
        var json2 = null;
        if (jsonString2 != null) {
            if (shouldSanitizeCallback(correlationId)) {
                jsonString2 = KASClient.sanitizeHtmlTags(jsonString2);
            }
            json2 = KASClient.parseJsonObject(jsonString2);
        }
        executeCallback(correlationId, [json1, json2, error]);
    }
    KASClient.onGetDoubleJson = onGetDoubleJson;
    // Internal success callback for StringCallback type
    function onGetString(correlationId, str) {
        if (str === void 0) { str = null; }
        if (shouldSanitizeCallback(correlationId)) {
            str = KASClient.sanitizeHtmlTags(str);
        }
        executeCallback(correlationId, [str, null]);
    }
    KASClient.onGetString = onGetString;
    // Internal success callback for BoolCallback type
    function onGetBool(correlationId, bool) {
        if (bool === void 0) { bool = false; }
        bool = JSON.parse("" + bool); // So that a non-boolean type gets converted to boolean
        executeCallback(correlationId, [bool, null]);
    }
    KASClient.onGetBool = onGetBool;
    ///////////////////////////////////////////////////////
    function getSurveyJson(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        sanitizeCallback(value["correlationId"]);
        KASClient.callNativeCommand(KASClient.GET_SURVEY_JSON_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getSurveyJson = getSurveyJson;
    ///////////////////////////////////////////////////////
    function getSurveySummaryJson(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        sanitizeCallback(value["correlationId"]);
        KASClient.callNativeCommand(KASClient.GET_SURVEY_SUMMARY_JSON_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getSurveySummaryJson = getSurveySummaryJson;
    ///////////////////////////////////////////////////////
    function getSurveyAggregatedSummaryJson(callback) {
        if (callback === void 0) { callback = null; }
        var value = getCorrelationIdForCallback(callback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_SURVEY_AGGREGATED_SUMMARY_JSON_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getSurveyAggregatedSummaryJson = getSurveyAggregatedSummaryJson;
    ///////////////////////////////////////////////////////
    function getSurveyResultJson(callback) {
        if (callback === void 0) { callback = null; }
        var value = getCorrelationIdForCallback(callback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_SURVEY_RESULT_JSON_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getSurveyResultJson = getSurveyResultJson;
    ///////////////////////////////////////////////////////
    function getSurveySummary(callback1, callback2) {
        if (callback1 === void 0) { callback1 = null; }
        if (callback2 === void 0) { callback2 = null; }
        var callback1Success = null;
        if (callback1) {
            var value1 = getCorrelationIdForCallback(callback1, "onGetDoubleJson", null);
            sanitizeCallback(value1["correlationId"]);
            callback1Success = value1["successCallback"];
        }
        var callback2Success = null;
        if (callback2) {
            var value2 = getCorrelationIdForCallback(callback2, "onGetDoubleJson", null);
            sanitizeCallback(value2["correlationId"]);
            callback2Success = value2["successCallback"];
        }
        KASClient.callNativeCommand(KASClient.GET_SURVEY_SUMMARY_WITH_NOTIFY_COMMAND, [callback1Success, callback2Success]);
    }
    KASClient.getSurveySummary = getSurveySummary;
    ///////////////////////////////////////////////////////
    function getSurveyURL(stringCallback) {
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_SURVEY_URL_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getSurveyURL = getSurveyURL;
    ///////////////////////////////////////////////////////
    function getSurveyLikesAndComments(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_LIKES_AND_COMMENTS_DATA_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getSurveyLikesAndComments = getSurveyLikesAndComments;
    ///////////////////////////////////////////////////////
    function getResponsesJson(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        sanitizeCallback(value["correlationId"]);
        KASClient.callNativeCommand(KASClient.GET_RESPONSES_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getResponsesJson = getResponsesJson;
    ///////////////////////////////////////////////////////
    function getAssetPathsJson(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_ASSET_PATHS_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getAssetPathsJson = getAssetPathsJson;
    ///////////////////////////////////////////////////////
    function getLocalizedStringsJson(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_LOCALIZED_STRINGS_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getLocalizedStringsJson = getLocalizedStringsJson;
    ///////////////////////////////////////////////////////
    function populateKASClientStrings(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.POPULATE_KASCLIENT_STRINGS, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.populateKASClientStrings = populateKASClientStrings;
    ///////////////////////////////////////////////////////
    function getPollStatus(boolCallback) {
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetPollStatus");
        KASClient.callNativeCommand(KASClient.GET_POLL_STATUS_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getPollStatus = getPollStatus;
    // Special handling, so not using onGetBool
    function onGetPollStatus(correlationId, pollStatus) {
        if (pollStatus === void 0) { pollStatus = 0; }
        var pollActive = true;
        if (pollStatus != 0) {
            pollActive = false;
        }
        executeCallback(correlationId, [pollActive, null]);
    }
    KASClient.onGetPollStatus = onGetPollStatus;
    ///////////////////////////////////////////////////////
    function getLocation(stringCallback) {
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_LOCATION_COMMAND, [], value["successCallback"], value["errorCallback"]);
    }
    KASClient.getLocation = getLocation;
    ///////////////////////////////////////////////////////
    function getCurrentLocation(stringCallback) {
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_CURRENT_LOCATION_COMMAND, [], value["successCallback"], value["errorCallback"]);
    }
    KASClient.getCurrentLocation = getCurrentLocation;
    ///////////////////////////////////////////////////////
    function getAppInfo(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_APP_INFO_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getAppInfo = getAppInfo;
    ///////////////////////////////////////////////////////
    function getAppLocale(localeCallback) {
        if (localeCallback === void 0) { localeCallback = null; }
        getAppInfo(function (appInfo, error) {
            var locale = null;
            if (appInfo) {
                locale = appInfo["locale"];
            }
            if (localeCallback) {
                localeCallback(locale, error);
            }
        });
    }
    KASClient.getAppLocale = getAppLocale;
    ///////////////////////////////////////////////////////
    function getUserDetails(userIds, jsonCallback) {
        if (userIds === void 0) { userIds = []; }
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_USER_DETAILS_COMMAND, userIds, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getUserDetails = getUserDetails;
    ///////////////////////////////////////////////////////
    function getIntegerationServiceToken(stringCallback) {
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_INTEGERATION_SERVICE_TOKEN_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getIntegerationServiceToken = getIntegerationServiceToken;
    ///////////////////////////////////////////////////////
    function getDeviceId(stringCallback) {
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_DEVICE_ID_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getDeviceId = getDeviceId;
    ///////////////////////////////////////////////////////
    function getConversationName(stringCallback) {
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_CONVERSATION_NAME_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getConversationName = getConversationName;
    ///////////////////////////////////////////////////////
    function getSelectedUsers(args, jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.SELECT_ASIGNEES_COMMAND, args, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getSelectedUsers = getSelectedUsers;
    ///////////////////////////////////////////////////////
    function getAttachmentPath(stringCallback) {
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_ATTACHMENT_PATH_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getAttachmentPath = getAttachmentPath;
    ///////////////////////////////////////////////////////
    function getAttachmentPaths(args, jsonCallback) {
        if (args === void 0) { args = []; }
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.SELECT_ATTACHMENTS_COMMAND, args, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getAttachmentPaths = getAttachmentPaths;
    ///////////////////////////////////////////////////////
    function downloadAttachment(attachment, jsonCallback) {
        if (attachment === void 0) { attachment = null; }
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.DOWNLOAD_ATTACHMENT_COMMAND, [attachment], value["successCallback"], value["errorCallback"]);
    }
    KASClient.downloadAttachment = downloadAttachment;
    ///////////////////////////////////////////////////////
    function cancelAttachmentDownload(attachment, stringCallback) {
        if (attachment === void 0) { attachment = null; }
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.CANCEL_ATTACHMENT_DOWNLOAD_COMMAND, [attachment], value["successCallback"], value["errorCallback"]);
    }
    KASClient.cancelAttachmentDownload = cancelAttachmentDownload;
    ///////////////////////////////////////////////////////
    function showPlacePicker(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.SHOW_PLACE_PICKER, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.showPlacePicker = showPlacePicker;
    ///////////////////////////////////////////////////////
    function showDurationPicker(defaultDurationInMinutes, stringCallback) {
        if (defaultDurationInMinutes === void 0) { defaultDurationInMinutes = 0; }
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.SHOW_DURATION_PICKER, [defaultDurationInMinutes], value["successCallback"], value["errorCallback"]);
    }
    KASClient.showDurationPicker = showDurationPicker;
    ///////////////////////////////////////////////////////
    function getCurrentUserId(stringCallback, bypassVersionChecking) {
        if (stringCallback === void 0) { stringCallback = null; }
        if (bypassVersionChecking === void 0) { bypassVersionChecking = false; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_CURRENT_USER_ID_COMMAND, null, value["successCallback"], value["errorCallback"], bypassVersionChecking);
    }
    KASClient.getCurrentUserId = getCurrentUserId;
    ///////////////////////////////////////////////////////
    function getMessageProperties(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_MESSAGE_PROPERTIES_COMMAND, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getMessageProperties = getMessageProperties;
    ///////////////////////////////////////////////////////
    function reassignJob(callback) {
        if (callback === void 0) { callback = null; }
        var value = getCorrelationIdForCallback(callback, "onGetString", null);
        KASClient.callNativeCommand(KASClient.REASSIGN_JOB_COMMAND, null, value["successCallback"], null);
    }
    KASClient.reassignJob = reassignJob;
    ///////////////////////////////////////////////////////
    function sendResponse(responseJson, responseId, isEditable, showInChatCanvas, isAnonymous, shouldDismiss) {
        if (responseJson === void 0) { responseJson = null; }
        if (responseId === void 0) { responseId = null; }
        if (isEditable === void 0) { isEditable = false; }
        if (showInChatCanvas === void 0) { showInChatCanvas = false; }
        if (isAnonymous === void 0) { isAnonymous = false; }
        if (shouldDismiss === void 0) { shouldDismiss = true; }
        KASClient.callNativeCommand(KASClient.UPDATE_RESPONSE_COMMAND, [responseJson, responseId, isEditable, showInChatCanvas, isAnonymous, shouldDismiss]);
    }
    KASClient.sendResponse = sendResponse;
    ///////////////////////////////////////////////////////
    function createRequest(surveyJson, payload, shouldInflate, shouldDismiss) {
        if (surveyJson === void 0) { surveyJson = null; }
        if (payload === void 0) { payload = null; }
        if (shouldInflate === void 0) { shouldInflate = false; }
        if (shouldDismiss === void 0) { shouldDismiss = true; }
        KASClient.callNativeCommand(KASClient.CREATE_REQUEST_COMMAND, [JSON.stringify(surveyJson), payload, shouldInflate, shouldDismiss]);
    }
    KASClient.createRequest = createRequest;
    ///////////////////////////////////////////////////////
    function updateRequest(fields, payload, shouldInflate, boolCallback) {
        if (fields === void 0) { fields = null; }
        if (payload === void 0) { payload = null; }
        if (shouldInflate === void 0) { shouldInflate = false; }
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.UPDATE_REQUEST_COMMAND, [fields], value["successCallback"], value["errorCallback"]);
    }
    KASClient.updateRequest = updateRequest;
    ///////////////////////////////////////////////////////
    function showAlert(message) {
        if (message === void 0) { message = null; }
        KASClient.callNativeCommand(KASClient.SHOW_ALERT_COMMAND, [message]);
    }
    KASClient.showAlert = showAlert;
    ///////////////////////////////////////////////////////
    function closeCard() {
        KASClient.callNativeCommand(KASClient.CLOSE_CARD_COMMAND);
    }
    KASClient.closeCard = closeCard;
    ///////////////////////////////////////////////////////
    function editCard() {
        KASClient.callNativeCommand(KASClient.EDIT_CARD_COMMAND);
    }
    KASClient.editCard = editCard;
    ///////////////////////////////////////////////////////
    function showLikesAndCommentsPage() {
        KASClient.callNativeCommand(KASClient.SHOW_LIKES_AND_COMMENTS_PAGE_COMMAND);
    }
    KASClient.showLikesAndCommentsPage = showLikesAndCommentsPage;
    ///////////////////////////////////////////////////////
    function showImageInFullScreen(urls, currentImageIndex) {
        if (urls === void 0) { urls = []; }
        if (currentImageIndex === void 0) { currentImageIndex = 0; }
        KASClient.callNativeCommand(KASClient.SHOW_IMAGE_FULL_SCREEN_COMMAND, [urls, currentImageIndex]);
    }
    KASClient.showImageInFullScreen = showImageInFullScreen;
    ///////////////////////////////////////////////////////
    function openImmersiveViewForAttachment(attachmentObj) {
        if (attachmentObj === void 0) { attachmentObj = null; }
        KASClient.callNativeCommand(KASClient.OPEN_IMMERSIVE_VIEW_FOR_ATTACHMENT, [attachmentObj]);
    }
    KASClient.openImmersiveViewForAttachment = openImmersiveViewForAttachment;
    ///////////////////////////////////////////////////////
    function hasStorageAccessForType(type, boolCallback) {
        if (type === void 0) { type = KASClient.KASAttachmentType.Image; }
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.CHECK_STORAGE_ACCESS_FOR_ATTACHMENTS, [type], value["successCallback"], value["errorCallback"]);
    }
    KASClient.hasStorageAccessForType = hasStorageAccessForType;
    ///////////////////////////////////////////////////////
    function generateBase64ThumbnailForAttachment(localPath, stringCallback) {
        if (localPath === void 0) { localPath = null; }
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GENERATE_THUMBNAIL_FOR_IMAGE_ATTACHMENT, [localPath], value["successCallback"], value["errorCallback"]);
    }
    KASClient.generateBase64ThumbnailForAttachment = generateBase64ThumbnailForAttachment;
    ///////////////////////////////////////////////////////
    function getFontSizeMultiplier(stringCallback) {
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_FONT_SIZE_MULTIPIER, null, value["successCallback"], value["successCallback"]);
    }
    KASClient.getFontSizeMultiplier = getFontSizeMultiplier;
    ///////////////////////////////////////////////////////
    function respondToSurvey() {
        KASClient.callNativeCommand(KASClient.RESPOND_TO_SURVEY_COMMAND);
    }
    KASClient.respondToSurvey = respondToSurvey;
    ///////////////////////////////////////////////////////
    function sendReminder() {
        KASClient.callNativeCommand(KASClient.SEND_REMINDER_COMMAND);
    }
    KASClient.sendReminder = sendReminder;
    ///////////////////////////////////////////////////////
    function forwardSurvey() {
        KASClient.callNativeCommand(KASClient.FORWARD_SURVEY_COMMAND);
    }
    KASClient.forwardSurvey = forwardSurvey;
    ///////////////////////////////////////////////////////
    function likeSurvey() {
        KASClient.callNativeCommand(KASClient.ADD_LIKE_COMMAND);
    }
    KASClient.likeSurvey = likeSurvey;
    ///////////////////////////////////////////////////////
    function addCommentOnSurvey(comment) {
        if (comment === void 0) { comment = null; }
        KASClient.callNativeCommand(KASClient.ADD_COMMENT_COMMAND, [comment]);
    }
    KASClient.addCommentOnSurvey = addCommentOnSurvey;
    ///////////////////////////////////////////////////////
    function dismissScreen() {
        KASClient.callNativeCommand(KASClient.DISMISS_SCREEN_COMMAND);
    }
    KASClient.dismissScreen = dismissScreen;
    ///////////////////////////////////////////////////////
    function showProgress(text) {
        if (text === void 0) { text = null; }
        KASClient.callNativeCommand(KASClient.SHOW_PROGRESS_BAR_COMMAND, [text]);
    }
    KASClient.showProgress = showProgress;
    ///////////////////////////////////////////////////////
    function hideProgress() {
        KASClient.callNativeCommand(KASClient.HIDE_PROGRESS_BAR_COMMAND);
    }
    KASClient.hideProgress = hideProgress;
    ///////////////////////////////////////////////////////
    function shareSurveyURL(url) {
        if (url === void 0) { url = null; }
        KASClient.callNativeCommand(KASClient.SEND_SURVEY_URL_COMMAND, [url]);
    }
    KASClient.shareSurveyURL = shareSurveyURL;
    ///////////////////////////////////////////////////////
    function logErrorNative(error) {
        if (error === void 0) { error = null; }
        KASClient.callNativeCommand(KASClient.LOG_ERROR_COMMAND, [error]);
    }
    KASClient.logErrorNative = logErrorNative;
    ///////////////////////////////////////////////////////////
    function getPackageProperties(jsonCallback, bypassVersionChecking) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        if (bypassVersionChecking === void 0) { bypassVersionChecking = false; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_PACKAGE_PROPERTIES_COMMAND, null, value["successCallback"], value["errorCallback"], bypassVersionChecking);
    }
    KASClient.getPackageProperties = getPackageProperties;
    ///////////////////////////////////////////////////////////
    function getClientSupportedSDKVersion(stringCallback, bypassVersionChecking) {
        if (stringCallback === void 0) { stringCallback = null; }
        if (bypassVersionChecking === void 0) { bypassVersionChecking = false; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_CLIENT_SUPPORTED_SDK_VERSION_COMMAND, null, value["successCallback"], value["errorCallback"], bypassVersionChecking);
    }
    KASClient.getClientSupportedSDKVersion = getClientSupportedSDKVersion;
    ///////////////////////////////////////////////////////
    function openStoreLink() {
        KASClient.callNativeCommand(KASClient.OPEN_STORE_LINK_COMMAND);
    }
    KASClient.openStoreLink = openStoreLink;
    ///////////////////////////////////////////////////////
    function sendCardTemplate(template) {
        if (template === void 0) { template = null; }
        KASClient.callNativeCommand(KASClient.SEND_CHAT_CARD_TEMPLATE, [JSON.stringify(template)]);
    }
    KASClient.sendCardTemplate = sendCardTemplate;
    ///////////////////////////////////////////////////////////
    function updateSurveyMetadata(args, boolCallback) {
        if (args === void 0) { args = []; }
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.UPDATE_SURVEY_METADATA, args, value["successCallback"], value["errorCallback"]);
    }
    KASClient.updateSurveyMetadata = updateSurveyMetadata;
    ///////////////////////////////////////////////////////////
    function getLocalizedMiniAppStrings(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_LOCALIZED_MINIAPP_STRINGS, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getLocalizedMiniAppStrings = getLocalizedMiniAppStrings;
    ///////////////////////////////////////////////////////////
    function getPackageCustomSettings(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_PACKAGE_CUSTOM_SETTINGS, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getPackageCustomSettings = getPackageCustomSettings;
    ///////////////////////////////////////////////////////////
    function generateUUID(stringCallback) {
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_UUID, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.generateUUID = generateUUID;
    ///////////////////////////////////////////////////////
    function getUrlContent(url, stringCallback) {
        if (url === void 0) { url = null; }
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_URL_CONTENT, [url], value["successCallback"], value["errorCallback"]);
    }
    KASClient.getUrlContent = getUrlContent;
    ///////////////////////////////////////////////////////////
    function shouldSeeSurveySummary(boolCallback) {
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.SHOULD_SEE_SURVEY_SUMMARY, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.shouldSeeSurveySummary = shouldSeeSurveySummary;
    ///////////////////////////////////////////////////////////
    function canRespondToSurvey(boolCallback) {
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.CAN_RESPOND_TO_SURVEY, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.canRespondToSurvey = canRespondToSurvey;
    ///////////////////////////////////////////////////////
    function isTalkBackEnabled(boolCallback) {
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.IS_TALKBACK_ENABLED, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.isTalkBackEnabled = isTalkBackEnabled;
    ///////////////////////////////////////////////////////
    function readTalkBackMessageNative(message) {
        if (message === void 0) { message = null; }
        KASClient.callNativeCommand(KASClient.READ_TALKBACK_MESSAGE, [message]);
    }
    KASClient.readTalkBackMessageNative = readTalkBackMessageNative;
    ///////////////////////////////////////////////////////
    function logToReportNative(data) {
        if (data === void 0) { data = null; }
        KASClient.callNativeCommand(KASClient.LOG_TO_REPORT_COMMAND, [data]);
    }
    KASClient.logToReportNative = logToReportNative;
    ///////////////////////////////////////////////////////
    function isCurrentUserO365Subscribed(boolCallback) {
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.IS_CURRENT_USER_O365_SUBSCRIBED, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.isCurrentUserO365Subscribed = isCurrentUserO365Subscribed;
    ///////////////////////////////////////////////////////
    function getConversationParticipantsCount(stringCallback) {
        if (stringCallback === void 0) { stringCallback = null; }
        var value = getCorrelationIdForCallback(stringCallback, "onGetString");
        KASClient.callNativeCommand(KASClient.GET_CONVERSATION_PARTICIPANTS_COUNT, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getConversationParticipantsCount = getConversationParticipantsCount;
    ///////////////////////////////////////////////////////////
    function getLocalProperties(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_LOCAL_PROPERTIES, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getLocalProperties = getLocalProperties;
    ///////////////////////////////////////////////////////////
    function updateLocalProperties(properties, boolCallback) {
        if (properties === void 0) { properties = null; }
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.UPDATE_LOCAL_PROPERTIES, [JSON.stringify(properties)], value["successCallback"], value["errorCallback"]);
    }
    KASClient.updateLocalProperties = updateLocalProperties;
    ///////////////////////////////////////////////////////////
    function getPackageCustomProperties(jsonCallback) {
        if (jsonCallback === void 0) { jsonCallback = null; }
        var value = getCorrelationIdForCallback(jsonCallback, "onGetJson");
        KASClient.callNativeCommand(KASClient.GET_PACKAGE_CUSTOM_PROPERTIES, null, value["successCallback"], value["errorCallback"]);
    }
    KASClient.getPackageCustomProperties = getPackageCustomProperties;
    ///////////////////////////////////////////////////////////
    function updatePackageCustomProperties(properties, boolCallback) {
        if (properties === void 0) { properties = null; }
        if (boolCallback === void 0) { boolCallback = null; }
        var value = getCorrelationIdForCallback(boolCallback, "onGetBool");
        KASClient.callNativeCommand(KASClient.UPDATE_PACKAGE_CUSTOM_PROPERTIES, [JSON.stringify(properties)], value["successCallback"], value["errorCallback"]);
    }
    KASClient.updatePackageCustomProperties = updatePackageCustomProperties;
    ///////////////////////////////////////////////////////////
    var currentLocale = null;
    function convertErrorCodeToStringAsync(errorCode, callback) {
        // A block to avoid repetitive code
        var errorBlock = function (errorCode) {
            if (callback) {
                var errorString = getErrorString(errorCode);
                callback(errorString);
            }
        };
        // If locale is not there, fetch it first
        if (currentLocale == null) {
            getAppLocale(function (locale, error) {
                if (error == null) {
                    currentLocale = locale;
                }
                else {
                    currentLocale = "en"; // Default locale
                }
                errorBlock(errorCode);
            });
        }
        else {
            errorBlock(errorCode);
        }
    }
    function getErrorString(errorCode) {
        var locale = currentLocale;
        // Check if we support that language or not
        if (!locale || !errorStrings.hasOwnProperty(locale)) {
            locale = "en";
        }
        if (errorStrings[locale].hasOwnProperty(errorCode)) {
            return errorStrings[locale][errorCode];
        }
        return errorCode;
    }
    var errorStrings = {
        "en": {
            // 100, Network Errors
            "100": "We could not fetch the results due to network error. Please try again later",
            // 200, Internal JSON Parsing Error/ Execution Exception Error
            "200": "Something went wrong, Please try again.",
            // 300, Unknown Error
            "300": "Unknown Error",
            // 400: An invalid operation
            "400": "Wrong Operation"
        },
        "hi": {
            "100": "We could not fetch the results due to network error. Please try again later",
            "200": "Something went wrong, Please try again",
            "300": "Unknown Error",
            "400": "Wrong Operation"
        },
        "te": {
            "100": "We could not fetch the results due to network error. Please try again later",
            "200": "Something went wrong, please try again",
            "300": "Unknown Error",
            "400": "Wrong Operation"
        }
    };
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    function callNativeCommand(command, args, successCallback, errorCallback, bypassVersionChecking) {
        if (args === void 0) { args = null; }
        if (successCallback === void 0) { successCallback = null; }
        if (errorCallback === void 0) { errorCallback = null; }
        if (bypassVersionChecking === void 0) { bypassVersionChecking = false; }
        // Special case to avoid recursion
        if (bypassVersionChecking) {
            callNative(command, args, successCallback, errorCallback);
            return;
        }
        KASClient.Version.commandIsCompatible(command, function (compatible) {
            if (compatible) {
                callNative(command, args, successCallback, errorCallback);
            }
            else if (!__NO_HTML__) {
                KASClient.UI.showIncompatibleScreen();
            }
            else {
                throw "VersionIncompatible";
            }
        });
    }
    KASClient.callNativeCommand = callNativeCommand;
    function callNative(command, args, successCallback, errorCallback) {
        if (args === void 0) { args = null; }
        if (successCallback === void 0) { successCallback = null; }
        if (errorCallback === void 0) { errorCallback = null; }
        if (KASClient.getPlatform() == KASClient.Platform.iOS) {
            KASClient.iOS.callNativeCommand(command, args, successCallback, errorCallback);
        }
        else if (KASClient.getPlatform() == KASClient.Platform.Android) {
            KASClient.Android.callNativeCommand(command, args, successCallback, errorCallback);
        }
        else if (KASClient.getPlatform() == KASClient.Platform.WindowsPhone ||
            KASClient.getPlatform() == KASClient.Platform.WindowsImmersive) {
            KASClient.UWP.callNativeCommand(command, args, successCallback, errorCallback);
        }
        else if (KASClient.isRenderedForActionDesigner()) {
            KASClient.ActionDesigner.callNativeCommand(command, args, successCallback, errorCallback);
        }
        else {
            if (!KASClient.shouldMockData()) {
                console.assert(false, "Unknwon platform");
            }
        }
    }
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var iOS;
    (function (iOS) {
        function callNativeCommand(command, args, successCallback, errorCallback) {
            if (args === void 0) { args = null; }
            if (successCallback === void 0) { successCallback = null; }
            if (errorCallback === void 0) { errorCallback = null; }
            var url = "surveyjs2objc://";
            var callInfo = {
                functionname: command,
                args: args,
                success: successCallback,
                error: errorCallback
            };
            url += rfc3986EncodeURIComponent(JSON.stringify(callInfo));
            // Below approach of changing window's location is in case of
            // multiple consecutive requests, these can nullify each other!!!
            // window.location.href = url;
            // So we'll use the iframe approach, so no two calls can overlap
            var iframe = document.createElement("IFRAME");
            iframe.setAttribute("src", url);
            document.documentElement.appendChild(iframe);
            iframe.parentNode.removeChild(iframe);
            iframe = null;
        }
        iOS.callNativeCommand = callNativeCommand;
        // encodeURIComponent escapes all characters except: -_.!~*'()
        // But iOS follows RFC3986 encoding which supports these characters.
        // So taking extra care for them!
        function rfc3986EncodeURIComponent(str) {
            return encodeURIComponent(str).replace(/[-_.!~*'()]/g, function (c) {
                return '%' + c.charCodeAt(0).toString(16);
            });
        }
    })(iOS = KASClient.iOS || (KASClient.iOS = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UWP;
    (function (UWP) {
        function callNativeCommand(command, args, successCallback, errorCallback) {
            if (args === void 0) { args = null; }
            if (successCallback === void 0) { successCallback = null; }
            if (errorCallback === void 0) { errorCallback = null; }
            if (KASClient.Version.clientSupports(KASClient.Version.VERSION_3_1, true /* considerMinorVersion */)) {
                callNativeCommandAsync(command, args, successCallback, errorCallback);
            }
            else {
                callNativeCommandSync(command, args, successCallback, errorCallback);
            }
        }
        UWP.callNativeCommand = callNativeCommand;
        function callNativeCommandAsync(command, args, successCallback, errorCallback) {
            if (args === void 0) { args = null; }
            if (successCallback === void 0) { successCallback = null; }
            if (errorCallback === void 0) { errorCallback = null; }
            switch (command) {
                case KASClient.GET_CLIENT_SUPPORTED_SDK_VERSION_COMMAND:
                case KASClient.OPEN_STORE_LINK_COMMAND:
                case KASClient.SHOW_ALERT_COMMAND:
                case KASClient.UPDATE_RESPONSE_COMMAND:
                case KASClient.CREATE_REQUEST_COMMAND:
                case KASClient.CLOSE_CARD_COMMAND:
                case KASClient.SHOW_LIKES_AND_COMMENTS_PAGE_COMMAND:
                case KASClient.RESPOND_TO_SURVEY_COMMAND:
                case KASClient.SEND_REMINDER_COMMAND:
                case KASClient.FORWARD_SURVEY_COMMAND:
                case KASClient.ADD_LIKE_COMMAND:
                case KASClient.DISMISS_SCREEN_COMMAND:
                case KASClient.SHOW_PROGRESS_BAR_COMMAND:
                case KASClient.HIDE_PROGRESS_BAR_COMMAND:
                case KASClient.SEND_SURVEY_URL_COMMAND:
                case KASClient.SCREEN_CHANGED_COMMAND:
                case KASClient.LOG_ERROR_COMMAND:
                case KASClient.SEND_CHAT_CARD_TEMPLATE:
                    // For these commands, we don't need an Async API
                    callNativeCommandSync(command, args, successCallback, errorCallback);
                    break;
                case KASClient.GET_SURVEY_JSON_COMMAND:
                    KaizalaPlatform.getValueAsync(successCallback, errorCallback, "surveyJson");
                    return;
                case KASClient.GET_SURVEY_SUMMARY_JSON_COMMAND:
                    KaizalaPlatform.getValueAsync(successCallback, errorCallback, "surveySummaryJson");
                    return;
                case KASClient.GET_SURVEY_RESULT_JSON_COMMAND:
                    KaizalaPlatform.getSurveySummaryResultAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_SURVEY_SUMMARY_WITH_NOTIFY_COMMAND:
                    KaizalaPlatform.getSurveySummaryAsync(args[0], args[1]);
                    return; // As the callbacks are already handled, lets return
                case KASClient.GET_SURVEY_URL_COMMAND:
                    KaizalaPlatform.getSurveyURLAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_RESPONSES_COMMAND:
                    KaizalaPlatform.getValueAsync(successCallback, errorCallback, "frsps");
                    return;
                case KASClient.GET_LIKES_AND_COMMENTS_DATA_COMMAND:
                    KaizalaPlatform.getLikesAndCommentsAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_ASSET_PATHS_COMMAND:
                    KaizalaPlatform.getAssetPathsAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_LOCALIZED_STRINGS_COMMAND:
                    KaizalaPlatform.getLocalizedStringsAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_POLL_STATUS_COMMAND:
                    KaizalaPlatform.getPollStatusAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_CURRENT_LOCATION_COMMAND:
                    KaizalaPlatform.getCurrentLocationAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_USER_DETAILS_COMMAND:
                    KaizalaPlatform.getUserDetailsAsync(successCallback, errorCallback, JSON.stringify(args));
                    return;
                case KASClient.GET_CONVERSATION_NAME_COMMAND:
                    KaizalaPlatform.getConversationNameAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_ATTACHMENT_PATH_COMMAND:
                    KaizalaPlatform.getAttachmentPathAsync(successCallback, errorCallback);
                    return;
                case KASClient.SELECT_ASIGNEES_COMMAND:
                    KaizalaPlatform.selectAssigneeAsync(args, successCallback, errorCallback);
                    return;
                case KASClient.GET_APP_INFO_COMMAND:
                    KaizalaPlatform.getAppInfoAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_MESSAGE_PROPERTIES_COMMAND:
                    KaizalaPlatform.getMessagePropertiesAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_CURRENT_USER_ID_COMMAND:
                    KaizalaPlatform.getUserIdAsync(successCallback, errorCallback);
                    return;
                case KASClient.REASSIGN_JOB_COMMAND:
                    KaizalaPlatform.reassignJobAsync(successCallback, errorCallback);
                    return;
                case KASClient.GET_PACKAGE_PROPERTIES_COMMAND:
                    KaizalaPlatform.getPackagePropertiesAsync(successCallback, errorCallback);
                    return;
                case KASClient.UPDATE_SURVEY_METADATA:
                    KaizalaPlatform.updateSurveyMetadata(args, successCallback, errorCallback);
                    return;
                default:
            }
        }
        function callNativeCommandSync(command, args, successCallback, errorCallback) {
            if (args === void 0) { args = null; }
            if (successCallback === void 0) { successCallback = null; }
            if (errorCallback === void 0) { errorCallback = null; }
            var result = null;
            switch (command) {
                case KASClient.GET_CLIENT_SUPPORTED_SDK_VERSION_COMMAND:
                    result = [KaizalaPlatform.getSupportedSDKVersion()];
                    break;
                case KASClient.OPEN_STORE_LINK_COMMAND:
                    KaizalaPlatform.openStoreLink();
                    break;
                case KASClient.GET_SURVEY_JSON_COMMAND:
                    result = [KaizalaPlatform.getValue("surveyJson")];
                    break;
                case KASClient.GET_SURVEY_SUMMARY_JSON_COMMAND:
                    result = [KaizalaPlatform.getValue("surveySummaryJson")];
                    break;
                case KASClient.GET_SURVEY_RESULT_JSON_COMMAND:
                    result = [KaizalaPlatform.getSurveySummaryResult()];
                    // Handling internet off scenario, so that HTML
                    // will load the error page
                    if (result == null || result[0] == null || result[0] == "") {
                        if (errorCallback) {
                            KASClient.executeFunction(errorCallback, ["Could not get required data"]);
                        }
                        return;
                    }
                    break;
                case KASClient.GET_SURVEY_SUMMARY_WITH_NOTIFY_COMMAND:
                    KaizalaPlatform.getSurveySummary(args[0], args[1]);
                    return; // As the callbacks are already handled, lets return
                case KASClient.GET_SURVEY_URL_COMMAND:
                    KaizalaPlatform.getSurveyURL(successCallback, errorCallback);
                    return; // As the callbacks are already handled, lets return
                case KASClient.GET_RESPONSES_COMMAND:
                    result = [KaizalaPlatform.getValue("frsps")];
                    break;
                case KASClient.GET_LIKES_AND_COMMENTS_DATA_COMMAND:
                    result = [KaizalaPlatform.getLikesAndCommentsDataWithError()];
                    break;
                case KASClient.GET_ASSET_PATHS_COMMAND:
                    result = [KaizalaPlatform.getAssetPaths()];
                    break;
                case KASClient.GET_LOCALIZED_STRINGS_COMMAND:
                    result = [KaizalaPlatform.getLocalizedStrings()];
                    break;
                case KASClient.GET_POLL_STATUS_COMMAND:
                    result = [KaizalaPlatform.getPollStatus()];
                    break;
                case KASClient.GET_CURRENT_LOCATION_COMMAND:
                    result = [KaizalaPlatform.getCurrentLocation()];
                    break;
                case KASClient.SHOW_ALERT_COMMAND:
                    KaizalaPlatform.showToast(args[0]);
                    break;
                case KASClient.UPDATE_RESPONSE_COMMAND:
                    KaizalaPlatform.updateMyResponse(JSON.stringify(args[0]), args[1], args[2]);
                    break;
                case KASClient.GET_USER_DETAILS_COMMAND:
                    result = [KaizalaPlatform.getUserDetails(JSON.stringify(args))];
                    break;
                case KASClient.GET_CONVERSATION_NAME_COMMAND:
                    result = [KaizalaPlatform.getConversationName()];
                    break;
                case KASClient.GET_ATTACHMENT_PATH_COMMAND:
                    result = [KaizalaPlatform.getAttachmentPath()];
                    break;
                case KASClient.CREATE_REQUEST_COMMAND:
                    KaizalaPlatform.createRequest(args[0], args[1], args[2]);
                    break;
                case KASClient.CLOSE_CARD_COMMAND:
                    KaizalaPlatform.closeCard();
                    break;
                case KASClient.SELECT_ASIGNEES_COMMAND:
                    result = [KaizalaPlatform.selectAssignee(args[0], args[1], args[2], args[3])];
                    break;
                case KASClient.GET_APP_INFO_COMMAND:
                    result = [KaizalaPlatform.getAppInfo()];
                    break;
                case KASClient.GET_MESSAGE_PROPERTIES_COMMAND:
                    result = [KaizalaPlatform.getMessageProperties()];
                    break;
                case KASClient.SHOW_LIKES_AND_COMMENTS_PAGE_COMMAND:
                    KaizalaPlatform.showLikesAndCommentsPage();
                    break;
                case KASClient.RESPOND_TO_SURVEY_COMMAND:
                    KaizalaPlatform.respondToSurvey();
                    break;
                case KASClient.SEND_REMINDER_COMMAND:
                    KaizalaPlatform.sendReminder();
                    break;
                case KASClient.FORWARD_SURVEY_COMMAND:
                    KaizalaPlatform.forwardSurvey();
                    break;
                case KASClient.GET_CURRENT_USER_ID_COMMAND:
                    result = [KaizalaPlatform.getUserId()];
                    break;
                case KASClient.ADD_LIKE_COMMAND:
                    KaizalaPlatform.addLike();
                    break;
                case KASClient.ADD_COMMENT_COMMAND:
                    KaizalaPlatform.addComment(args[0]);
                    break;
                case KASClient.DISMISS_SCREEN_COMMAND:
                    KaizalaPlatform.dismissActivity();
                    break;
                case KASClient.SHOW_PROGRESS_BAR_COMMAND:
                    KaizalaPlatform.showProgressBar();
                    break;
                case KASClient.HIDE_PROGRESS_BAR_COMMAND:
                    KaizalaPlatform.hideProgressBar();
                    break;
                case KASClient.REASSIGN_JOB_COMMAND:
                    result = [KaizalaPlatform.reassignJob()];
                    break;
                case KASClient.SEND_SURVEY_URL_COMMAND:
                    KaizalaPlatform.sendUrl(args[0]);
                    break;
                case KASClient.SCREEN_CHANGED_COMMAND:
                    KaizalaPlatform.sendScreenChange(args[0]);
                    break;
                case KASClient.LOG_ERROR_COMMAND:
                    KaizalaPlatform.logError(args[0]);
                    break;
                case KASClient.GET_PACKAGE_PROPERTIES_COMMAND:
                    result = [KaizalaPlatform.getPackageProperties()];
                    break;
                case KASClient.SEND_CHAT_CARD_TEMPLATE:
                    KaizalaPlatform.sendChatCardTemplate(args[0]);
                    break;
                default:
            }
            if (successCallback) {
                if (result) {
                    KASClient.executeFunction(successCallback, result);
                }
                else {
                    KASClient.executeFunction(successCallback);
                }
            }
        }
    })(UWP = KASClient.UWP || (KASClient.UWP = {}));
})(KASClient || (KASClient = {}));
if (typeof Object.assign != 'function') {
    (function () {
        Object.assign = function (target) {
            if (target === undefined || target === null) {
                target = {};
            }
            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined && source !== null) {
                    for (var nextKey in source) {
                        if (source.hasOwnProperty(nextKey)) {
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        };
    })();
}
if (typeof Object.values != 'function') {
    (function () {
        Object.values = function (target) {
            var output = [];
            if (target !== undefined && target !== null) {
                for (var nextKey in target) {
                    if (target.hasOwnProperty(nextKey)) {
                        output.push(target[nextKey]);
                    }
                }
            }
            return output;
        };
    })();
}
var KASClient;
(function (KASClient) {
    var Platform;
    (function (Platform) {
        Platform[Platform["Unknown"] = 0] = "Unknown";
        Platform[Platform["iOS"] = 1] = "iOS";
        Platform[Platform["Android"] = 2] = "Android";
        Platform[Platform["WindowsPhone"] = 3] = "WindowsPhone";
        Platform[Platform["WindowsImmersive"] = 4] = "WindowsImmersive";
    })(Platform = KASClient.Platform || (KASClient.Platform = {}));
    function getPlatform() {
        var userAgent = navigator.userAgent || navigator.vendor || window["KASClient"].opera;
        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return Platform.WindowsPhone;
        }
        if (/WPDesktop/i.test(userAgent)) {
            return Platform.WindowsImmersive;
        }
        if (/android/i.test(userAgent)) {
            return Platform.Android;
        }
        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window["KASClient"].MSStream) {
            return Platform.iOS;
        }
        return Platform.Unknown;
    }
    KASClient.getPlatform = getPlatform;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    function parseJsonArray(jsonString) {
        try {
            return JSON.parse(jsonString);
        }
        catch (e) {
            return JSON.parse("[]");
        }
    }
    KASClient.parseJsonArray = parseJsonArray;
    function parseJsonObject(jsonString) {
        try {
            return JSON.parse(jsonString);
        }
        catch (e) {
            return JSON.parse("{}");
        }
    }
    KASClient.parseJsonObject = parseJsonObject;
    // To avoid HTML injections, we sanitize all HTML tags
    // by replacing all '<' with '&lt;' and '>' with '&gt;'
    function sanitizeHtmlTags(string) {
        var tagsToReplace = {
            '<': '&lt;',
            '>': '&gt;'
        };
        var sanitizedString = string.replace(/[&<>]/g, function (tag) {
            return tagsToReplace[tag] || tag;
        });
        return sanitizedString;
    }
    KASClient.sanitizeHtmlTags = sanitizeHtmlTags;
    function executeFunction(funcNameWithNamespaces, args) {
        if (args === void 0) { args = []; }
        var argString = "";
        for (var i = 0; i < args.length; i++) {
            var arg = args[i];
            if (arg != null) {
                // Escape sequencing for strings
                if (typeof arg === "string") {
                    arg = replaceCharacterInString(arg, "\\", "\\\\");
                    arg = replaceCharacterInString(arg, "\'", "\\\'");
                    arg = replaceCharacterInString(arg, "\"", "\\\"");
                }
                if (argString == "") {
                    argString = "\"" + arg + "\"";
                }
                else {
                    argString += ", \"" + arg + "\"";
                }
            }
            else {
                if (argString == "") {
                    argString = "null";
                }
                else {
                    argString += ", null";
                }
            }
        }
        var functionWithArgs;
        if (argString == null || argString == "") {
            functionWithArgs = "return " + funcNameWithNamespaces + "()";
        }
        else {
            functionWithArgs = "return " + funcNameWithNamespaces + "(" + argString + ")";
        }
        var func = new Function(functionWithArgs);
        return func();
    }
    KASClient.executeFunction = executeFunction;
    function replaceCharacterInString(str, oldChar, newChar) {
        return str.split(oldChar).join(newChar);
    }
    KASClient.replaceCharacterInString = replaceCharacterInString;
    function getEllipsizedString(str, maxLength) {
        str = str.trim();
        if (str.length <= maxLength) {
            return str;
        }
        else {
            var lastSpaceIndex = str.lastIndexOf(" ", maxLength);
            if (lastSpaceIndex <= 0) {
                return str.substring(0, maxLength) + "...";
            }
            else {
                return str.substring(0, lastSpaceIndex) + "...";
            }
        }
    }
    KASClient.getEllipsizedString = getEllipsizedString;
    function syntaxHighlightJson(json) {
        addPrettyPrintClasses();
        var jsonStr = JSON.stringify(json, undefined, 2);
        jsonStr = jsonStr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return jsonStr.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var className = 'numberPretty';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    className = 'keyPretty';
                }
                else {
                    className = 'stringPretty';
                }
            }
            else if (/true|false/.test(match)) {
                className = 'booleanPretty';
            }
            else if (/null/.test(match)) {
                className = 'nullPretty';
            }
            return '<span class="' + className + '">' + match + '</span>';
        });
    }
    KASClient.syntaxHighlightJson = syntaxHighlightJson;
    var prettyPrintClassesAdded = false;
    function addPrettyPrintClasses() {
        if (prettyPrintClassesAdded) {
            return; // Already added
        }
        var style = document.createElement('style');
        style.type = 'text/css';
        var stringClass = '.stringPretty { color: green; } ';
        var numberClass = '.numberPretty { color: darkorange; } ';
        var booleanClass = '.booleanPretty { color: blue; } ';
        var nullClass = '.nullPretty { color: magenta; } ';
        var keyClass = '.keyPretty { color: red; } ';
        style.innerHTML = stringClass + numberClass + booleanClass + nullClass + keyClass;
        document.getElementsByTagName('head')[0].appendChild(style);
        prettyPrintClassesAdded = true;
    }
    function jsonIsArray(json) {
        return Object.prototype.toString.call(json) === '[object Array]';
    }
    KASClient.jsonIsArray = jsonIsArray;
    function isURL(str) {
        if (typeof str === 'string' &&
            (str.lastIndexOf("http://", 0) == 0 ||
                str.lastIndexOf("https://", 0) == 0 ||
                str.lastIndexOf("file://", 0) == 0)) {
            return true;
        }
        return false;
    }
    KASClient.isURL = isURL;
    function isLocation(response) {
        try {
            var location = parseJsonObject(response);
            if (Object.prototype.toString.call(location) === '[object Object]') {
                return (location.hasOwnProperty("lt") &&
                    location.hasOwnProperty("lg") &&
                    location.hasOwnProperty("n"));
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    }
    KASClient.isLocation = isLocation;
    function getLocationName(response) {
        if (isLocation(response)) {
            var location = parseJsonObject(response);
            return location["n"];
        }
        return null;
    }
    KASClient.getLocationName = getLocationName;
    function truncatedDecimalString(num) {
        return num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
    }
    KASClient.truncatedDecimalString = truncatedDecimalString;
    function getExpiryUntilString(date) {
        var expiryUntil = (date.getTime() - (new Date()).getTime()) / 1000; // seconds
        var expiryString = "";
        var days = 0, hours = 0, minutes = 0, seconds = 0;
        var dayInSeconds = 24 * 60 * 60;
        if (expiryUntil >= dayInSeconds) {
            days = Math.floor(expiryUntil / dayInSeconds);
            expiryUntil -= (days * dayInSeconds);
            expiryString += days + "d ";
        }
        var hourInSeconds = 60 * 60;
        if (expiryUntil >= hourInSeconds) {
            hours = Math.floor(expiryUntil / hourInSeconds);
            expiryUntil -= (hours * hourInSeconds);
            expiryString += hours + "h ";
        }
        var minuteInSeconds = 60;
        if (expiryUntil >= minuteInSeconds) {
            minutes = Math.floor(expiryUntil / minuteInSeconds);
            expiryUntil -= (minutes * minuteInSeconds);
            expiryString += minutes + "m ";
        }
        seconds = expiryUntil;
        return expiryString;
    }
    KASClient.getExpiryUntilString = getExpiryUntilString;
    function getDateString(date, showDayOfWeek, showTime) {
        if (showDayOfWeek === void 0) { showDayOfWeek = true; }
        if (showTime === void 0) { showTime = true; }
        var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        // Format "Mon Aug 15, 12:30 AM"
        var dateString = "";
        // Optional
        if (showDayOfWeek) {
            dateString += day[date.getDay()] + " ";
        }
        // Mandatory
        dateString += PrefixZero(date.getDate()) + " " + month[date.getMonth()];
        // Optional
        if (showTime) {
            var strTime = getTimeString(date);
            dateString += ", " + strTime;
        }
        return dateString;
    }
    KASClient.getDateString = getDateString;
    /* convert DateTime object to readable String format
    */
    function getTimeString(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? minutes : minutes;
        var strTime = PrefixZero(hours) + ":" + PrefixZero(minutes) + " " + ampm;
        return strTime;
    }
    KASClient.getTimeString = getTimeString;
    /* convert Time object as Number value to readable String format
    */
    function toStringTimeObject(time) {
        var hours = time.split(":")[0];
        var minutes = time.split(":")[1];
        var suffix = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12;
        hours = hours < 10 ? "0" + hours : hours;
        var displayTime = hours + ":" + minutes + " " + suffix;
        return displayTime;
    }
    KASClient.toStringTimeObject = toStringTimeObject;
    function PrefixZero(n) {
        return ("0" + n).slice(-2);
    }
    /* convert int (number if bytes) into readable format
    * for example 1024*1024 gets converted to 1MB
    */
    function formatSize(bytes) {
        var unit = 1024;
        if (bytes < unit)
            return bytes + " B";
        var exp = parseInt("" + (Math.log(bytes) / Math.log(unit)));
        var pre = "KMGTPE"[exp - 1];
        var retVal = (bytes / Math.pow(unit, exp)).toFixed(1) + " " + pre + "B";
        return retVal;
    }
    KASClient.formatSize = formatSize;
    function isEmptyString(str) {
        if (str == undefined || str == null || str.length == 0) {
            return true;
        }
        return false;
    }
    KASClient.isEmptyString = isEmptyString;
    function getJsonFromFileAsync(file, callback) {
        var json = JSON.parse("{}");
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.addEventListener("load", function (e) {
            var allText = rawFile.responseText;
            var error = null;
            try {
                json = JSON.parse(allText);
            }
            catch (e) {
                error = e;
            }
            if (callback) {
                callback(json, error);
            }
        }, false);
        rawFile.send(null);
    }
    KASClient.getJsonFromFileAsync = getJsonFromFileAsync;
    var mockData = false;
    function shouldMockData() {
        return mockData;
    }
    KASClient.shouldMockData = shouldMockData;
    function enableMockData() {
        mockData = true;
    }
    KASClient.enableMockData = enableMockData;
    function isRenderedForActionDesigner() {
        return inIframe() && window.parent.hasOwnProperty("__ACTION_DESIGNER__");
    }
    KASClient.isRenderedForActionDesigner = isRenderedForActionDesigner;
    function inIframe() {
        try {
            return window.self !== window.top;
        }
        catch (e) {
            return true;
        }
    }
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var Version;
    (function (Version) {
        Version.VERSION_0 = "0";
        Version.VERSION_1 = "1";
        Version.VERSION_2 = "2";
        Version.VERSION_3 = "3";
        Version.VERSION_3_1 = "3.1"; // A minor version for Android Async APIs
        Version.VERSION_4 = "4";
        Version.VERSION_5 = "5";
        Version.VERSION_6 = "6";
        Version.VERSION_7 = "7";
        Version.VERSION_8 = "8";
        Version.VERSION_9 = "9";
        Version.VERSION_10 = "10";
        Version.VERSION_11 = "11";
        Version.VERSION_12 = "12";
        Version.VERSION_13 = "13";
        Version.VERSION_14 = "14";
        var commandVersion = {};
        // Commands introduced in version-0 SDK
        commandVersion[KASClient.CLOSE_CARD_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.CREATE_REQUEST_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.GET_APP_INFO_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.GET_ASSET_PATHS_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.GET_ATTACHMENT_PATH_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.GET_CURRENT_LOCATION_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.GET_LOCALIZED_STRINGS_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.GET_POLL_STATUS_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.GET_RESPONSES_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.GET_SURVEY_JSON_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.GET_SURVEY_SUMMARY_JSON_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.GET_USER_DETAILS_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.SELECT_ASIGNEES_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.SHOW_ALERT_COMMAND] = Version.VERSION_0;
        commandVersion[KASClient.UPDATE_RESPONSE_COMMAND] = Version.VERSION_0;
        // Commands introduced in version-1 SDK
        commandVersion[KASClient.ADD_LIKE_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.DISMISS_SCREEN_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.FORWARD_SURVEY_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.GET_CONVERSATION_NAME_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.GET_CURRENT_USER_ID_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.GET_LIKES_AND_COMMENTS_DATA_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.GET_SURVEY_RESULT_JSON_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.GET_SURVEY_SUMMARY_WITH_NOTIFY_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.GET_SURVEY_URL_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.HIDE_PROGRESS_BAR_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.RESPOND_TO_SURVEY_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.SEND_REMINDER_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.SEND_SURVEY_URL_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.SHOW_LIKES_AND_COMMENTS_PAGE_COMMAND] = Version.VERSION_1;
        commandVersion[KASClient.SHOW_PROGRESS_BAR_COMMAND] = Version.VERSION_1;
        // Commands introduced in version-2 SDK
        commandVersion[KASClient.GET_PACKAGE_PROPERTIES_COMMAND] = Version.VERSION_2;
        // Commands introduced in version-3 SDK
        commandVersion[KASClient.GET_CLIENT_SUPPORTED_SDK_VERSION_COMMAND] = Version.VERSION_3;
        commandVersion[KASClient.OPEN_STORE_LINK_COMMAND] = Version.VERSION_3;
        commandVersion[KASClient.SEND_CHAT_CARD_TEMPLATE] = Version.VERSION_3;
        commandVersion[KASClient.UPDATE_SURVEY_METADATA] = Version.VERSION_3;
        commandVersion[KASClient.ADD_COMMENT_COMMAND] = Version.VERSION_3;
        commandVersion[KASClient.GET_SURVEY_AGGREGATED_SUMMARY_JSON_COMMAND] = Version.VERSION_3;
        // Commands introduced in version-4 SDK
        commandVersion[KASClient.GET_LOCALIZED_MINIAPP_STRINGS] = Version.VERSION_4;
        // Commands introduced in version-5 SDK
        commandVersion[KASClient.SHOULD_SEE_SURVEY_SUMMARY] = Version.VERSION_5;
        commandVersion[KASClient.CAN_RESPOND_TO_SURVEY] = Version.VERSION_5;
        // Commands introduced in version-6 SDK
        commandVersion[KASClient.LOG_TO_REPORT_COMMAND] = Version.VERSION_6;
        commandVersion[KASClient.IS_CURRENT_USER_O365_SUBSCRIBED] = Version.VERSION_6;
        // Commands introduced in version-7 SDK
        commandVersion[KASClient.GET_CONVERSATION_PARTICIPANTS_COUNT] = Version.VERSION_7;
        commandVersion[KASClient.SHOW_PLACE_PICKER] = Version.VERSION_7;
        commandVersion[KASClient.SHOW_DURATION_PICKER] = Version.VERSION_7;
        // Commands introduced in version-8 SDK
        commandVersion[KASClient.EDIT_CARD_COMMAND] = Version.VERSION_8;
        commandVersion[KASClient.UPDATE_REQUEST_COMMAND] = Version.VERSION_8;
        // Commands introduced in version-9 SDK
        commandVersion[KASClient.GET_INTEGERATION_SERVICE_TOKEN_COMMAND] = Version.VERSION_9;
        commandVersion[KASClient.IS_TALKBACK_ENABLED] = Version.VERSION_9;
        commandVersion[KASClient.SHOW_IMAGE_FULL_SCREEN_COMMAND] = Version.VERSION_9;
        // Commands introduced in version-10 SDK
        commandVersion[KASClient.READ_TALKBACK_MESSAGE] = Version.VERSION_10;
        commandVersion[KASClient.POPULATE_KASCLIENT_STRINGS] = Version.VERSION_10;
        commandVersion[KASClient.GET_FONT_SIZE_MULTIPIER] = Version.VERSION_10;
        // Commands introduced in version-11 SDK
        commandVersion[KASClient.SELECT_ATTACHMENTS_COMMAND] = Version.VERSION_11;
        commandVersion[KASClient.DOWNLOAD_ATTACHMENT_COMMAND] = Version.VERSION_11;
        commandVersion[KASClient.CANCEL_ATTACHMENT_DOWNLOAD_COMMAND] = Version.VERSION_11;
        // Commands introduced in version-12 SDK
        commandVersion[KASClient.OPEN_IMMERSIVE_VIEW_FOR_ATTACHMENT] = Version.VERSION_12;
        commandVersion[KASClient.GENERATE_THUMBNAIL_FOR_IMAGE_ATTACHMENT] = Version.VERSION_12;
        commandVersion[KASClient.CHECK_STORAGE_ACCESS_FOR_ATTACHMENTS] = Version.VERSION_12;
        commandVersion[KASClient.GET_PACKAGE_CUSTOM_SETTINGS] = Version.VERSION_12;
        // Commands introduced in version-13 SDK
        commandVersion[KASClient.GET_LOCAL_PROPERTIES] = Version.VERSION_13;
        commandVersion[KASClient.UPDATE_LOCAL_PROPERTIES] = Version.VERSION_13;
        commandVersion[KASClient.GET_PACKAGE_CUSTOM_PROPERTIES] = Version.VERSION_13;
        commandVersion[KASClient.UPDATE_PACKAGE_CUSTOM_PROPERTIES] = Version.VERSION_13;
        commandVersion[KASClient.GET_DEVICE_ID_COMMAND] = Version.VERSION_13;
        // Commands introduced in version-14 SDK
        commandVersion[KASClient.GET_UUID] = Version.VERSION_14;
        // The below method doesn't consider minor version
        function commandIsCompatible(command, callback) {
            if (!commandVersion.hasOwnProperty(command)) {
                callback(true);
            }
            else {
                getClientSupportedVersion(function (version) {
                    var commandRequiredVersion = parseInt(commandVersion[command]);
                    var clientSupportedVersion = parseInt(version);
                    callback((commandRequiredVersion <= clientSupportedVersion));
                });
            }
        }
        Version.commandIsCompatible = commandIsCompatible;
        var _clientSupportedSDKVersion = null;
        function didReceiveClientSupportedVersion() {
            return (_clientSupportedSDKVersion != null);
        }
        Version.didReceiveClientSupportedVersion = didReceiveClientSupportedVersion;
        function clientSupports(version, considerMinorVersion) {
            if (considerMinorVersion === void 0) { considerMinorVersion = false; }
            var versionToCheck;
            var clientSupportedVersion;
            if (!considerMinorVersion) {
                versionToCheck = parseInt(version);
                clientSupportedVersion = parseInt(_clientSupportedSDKVersion);
            }
            else {
                versionToCheck = parseFloat(version);
                clientSupportedVersion = parseFloat(_clientSupportedSDKVersion);
            }
            return (versionToCheck <= clientSupportedVersion);
        }
        Version.clientSupports = clientSupports;
        function setClientSupportedVersion(version) {
            _clientSupportedSDKVersion = version;
        }
        Version.setClientSupportedVersion = setClientSupportedVersion;
        function getClientSupportedVersion(callback) {
            // If client supported version is already received, no need to query again!
            if (_clientSupportedSDKVersion) {
                callback(_clientSupportedSDKVersion);
            }
            else {
                // Version-3+ representative API
                var version3PlusChecker = function (commandReturned) {
                    KASClient.getClientSupportedSDKVersion(function (version, error) {
                        _clientSupportedSDKVersion = version;
                        commandReturned();
                    }, true /* bypassVersionChecking */);
                };
                // Version-2 representative API
                var version2Checker = function (commandReturned) {
                    KASClient.getPackageProperties(function (properties, error) {
                        if (_clientSupportedSDKVersion == null) {
                            _clientSupportedSDKVersion = Version.VERSION_2;
                            commandReturned();
                        }
                        // Else it's a stale call, cause we've already got the version
                    }, true /* bypassVersionChecking */);
                };
                // Version-1 representative API
                var version1Checker = function (commandReturned) {
                    KASClient.getCurrentUserId(function (userId, error) {
                        if (_clientSupportedSDKVersion == null) {
                            _clientSupportedSDKVersion = Version.VERSION_1;
                            commandReturned();
                        }
                        // Else it's a stale call, cause we've already got the version
                    }, true /* bypassVersionChecking */);
                };
                // If client already supports version-3+ SDK, then we can query
                // for the supported version directly!
                checkIfCommandExists(version3PlusChecker, function (exists) {
                    if (exists) {
                        callback(_clientSupportedSDKVersion);
                    }
                    else {
                        // Else client is older than version-3,
                        // Check for version-2 first, then version-1,
                        // if none is compatible, then it's version-0
                        checkIfCommandExists(version2Checker, function (exists) {
                            if (exists) {
                                callback(_clientSupportedSDKVersion);
                            }
                            else {
                                checkIfCommandExists(version1Checker, function (exists) {
                                    if (exists) {
                                        callback(_clientSupportedSDKVersion);
                                    }
                                    else {
                                        // At this point it's safe to say that the client is primitive
                                        _clientSupportedSDKVersion = Version.VERSION_0;
                                        callback(_clientSupportedSDKVersion);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
        Version.getClientSupportedVersion = getClientSupportedVersion;
        function checkIfCommandExists(commandWrapper, callback) {
            if (KASClient.getPlatform() == KASClient.Platform.iOS) {
                // iOS runs in asynchronous model, so only a timeout
                // can indicate the api doesn't exist in client side
                var callbackCalled = false;
                commandWrapper(function () {
                    callbackCalled = true;
                    callback(true);
                });
                setTimeout(function () {
                    // Timeout occurred
                    if (!callbackCalled) {
                        callback(false);
                    }
                }, 100 /* ms */);
            }
            else {
                // Android runs in synchronous model, so an exception
                // will indicate the api doesn't exist in client side
                try {
                    commandWrapper(function () {
                        callback(true);
                    });
                }
                catch (e) {
                    callback(false);
                }
            }
        }
        Version.checkIfCommandExists = checkIfCommandExists;
    })(Version = KASClient.Version || (KASClient.Version = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASActionPackageProperties = (function () {
        function KASActionPackageProperties() {
            // Package id of the MiniApp, shouldn't be changed
            this.actionPackageId = "";
        }
        KASActionPackageProperties.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var packageProperties = new KASActionPackageProperties();
            packageProperties.json = object;
            if (object.hasOwnProperty("actionPackageId")) {
                packageProperties.actionPackageId = object["actionPackageId"];
            }
            if (object.hasOwnProperty("properties")) {
                var propertiesObject = JSON.parse(object["properties"]);
                packageProperties.properties = propertiesObject;
            }
            return packageProperties;
        };
        return KASActionPackageProperties;
    }());
    KASClient.KASActionPackageProperties = KASActionPackageProperties;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASActionProperties = (function () {
        function KASActionProperties() {
            // Package id of the MiniApp, shouldn't be changed
            this.actionPackageId = "";
            // Id of a particular action of the mini app
            this.actionId = "";
            // Type of the action properties
            this.actionPropertyType = KASClient.KASActionPropertyType.Local;
        }
        KASActionProperties.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var actionProperties = new KASActionProperties();
            actionProperties.json = object;
            if (object.hasOwnProperty("actionPackageId")) {
                actionProperties.actionPackageId = object["actionPackageId"];
            }
            if (object.hasOwnProperty("actionId")) {
                actionProperties.actionId = object["actionId"];
            }
            if (object.hasOwnProperty("actionPropertyType")) {
                actionProperties.actionPropertyType = object["actionPropertyType"];
            }
            if (object.hasOwnProperty("properties")) {
                var propertiesObject = JSON.parse(object["properties"]);
                actionProperties.properties = propertiesObject;
            }
            return actionProperties;
        };
        return KASActionProperties;
    }());
    KASClient.KASActionProperties = KASActionProperties;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASActionPropertyType;
    (function (KASActionPropertyType) {
        // Server Properties for the action
        KASActionPropertyType[KASActionPropertyType["Server"] = 0] = "Server";
        // Local Properties for the action
        KASActionPropertyType[KASActionPropertyType["Local"] = 1] = "Local";
    })(KASActionPropertyType = KASClient.KASActionPropertyType || (KASClient.KASActionPropertyType = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASAttachmentViewModel = (function () {
        function KASAttachmentViewModel() {
            this.hasStaticContent = false;
            this.allLocalPathsAvailable = true;
            this.allServerPathsAvailable = false;
            this.downloadProgress = 0;
            this.isDownloading = false;
            this.isAutoDownloadEnabled = false;
            this.isOutgoing = false;
            this.messageSendStatus = 0;
            this.enableOnTap = true;
            this.showRemoveButton = false;
            this.showLoadingWhileUploads = false;
            this.height = "180px";
            this.width = "100%";
        }
        return KASAttachmentViewModel;
    }());
    KASClient.KASAttachmentViewModel = KASAttachmentViewModel;
})(KASClient || (KASClient = {}));
/// <reference path="./KASAttachmentViewModel.ts" />
var KASClient;
(function (KASClient) {
    var KASAlbumViewModel = (function (_super) {
        __extends(KASAlbumViewModel, _super);
        function KASAlbumViewModel() {
            var _this = _super.call(this) || this;
            _this.imageLocalPaths = [];
            _this.imageObjects = [];
            _this.thumbnailBase64 = "";
            _this.shouldBlurThumbnail = false;
            return _this;
        }
        return KASAlbumViewModel;
    }(KASClient.KASAttachmentViewModel));
    KASClient.KASAlbumViewModel = KASAlbumViewModel;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASAttachment = (function () {
        function KASAttachment() {
            this.type = KASClient.KASAttachmentType.Image;
            this.fileName = "";
            this.size = 0;
            this.localPath = "";
            this.serverPath = "";
            this.attachmentId = "";
        }
        /**
         * The following string keys("ty", "afn", "asb", etc.) MUST be in sync with the Attachment object model representation in iOS and Android code.
         * This is vital for proper serialization and deserialization over the KAS bridge.
         */
        KASAttachment.prototype.toJSON = function () {
            var object = JSON.parse("{}");
            object["ty"] = this.type;
            object["afn"] = this.fileName;
            object["asb"] = this.size;
            object["spu"] = this.serverPath;
            object["lpu"] = this.localPath;
            object["id"] = this.attachmentId;
            return object;
        };
        KASAttachment.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var attachment = new KASAttachment();
            this.populateModelFromJSON(attachment, object);
            return attachment;
        };
        KASAttachment.populateModelFromJSON = function (attachment, object) {
            if (object == null)
                return;
            if (object.hasOwnProperty("ty")) {
                attachment.type = object["ty"];
            }
            if (object.hasOwnProperty("afn")) {
                attachment.fileName = object["afn"];
            }
            if (object.hasOwnProperty("asb")) {
                attachment.size = object["asb"];
            }
            if (object.hasOwnProperty("spu")) {
                attachment.serverPath = object["spu"];
            }
            if (object.hasOwnProperty("lpu")) {
                attachment.localPath = object["lpu"];
            }
            if (object.hasOwnProperty("id")) {
                attachment.attachmentId = object["id"];
            }
        };
        KASAttachment.hasLocalPath = function (obj) {
            return obj != null && !KASClient.isEmptyString(obj.localPath);
        };
        KASAttachment.hasServerPath = function (obj) {
            return obj != null && !KASClient.isEmptyString(obj.serverPath);
        };
        return KASAttachment;
    }());
    KASClient.KASAttachment = KASAttachment;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASAttachmentFactory = (function () {
        function KASAttachmentFactory() {
        }
        KASAttachmentFactory.getObjectOfType = function (type) {
            var obj = null;
            switch (type) {
                case KASClient.KASAttachmentType.Image:
                    obj = new KASClient.KASImageAttachment();
                    break;
                case KASClient.KASAttachmentType.Audio:
                case KASClient.KASAttachmentType.Document:
                default:
                    obj = new KASClient.KASAttachment();
                    break;
            }
            return obj;
        };
        KASAttachmentFactory.fromJSON = function (object) {
            if (object == null)
                return null;
            var type = object["ty"];
            var obj = this.getObjectOfType(type);
            switch (type) {
                case KASClient.KASAttachmentType.Image:
                    obj = KASClient.KASImageAttachment.fromJSON(object);
                    break;
                case KASClient.KASAttachmentType.Audio:
                case KASClient.KASAttachmentType.Document:
                default:
                    obj = KASClient.KASAttachment.fromJSON(object);
                    break;
            }
            return obj;
        };
        return KASAttachmentFactory;
    }());
    KASClient.KASAttachmentFactory = KASAttachmentFactory;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASQuestionConfig = (function () {
        function KASQuestionConfig() {
            // Config to denote if a new page should start after the current question
            this.pageBreakEnabled = true;
        }
        KASQuestionConfig.prototype.toJSON = function () {
            var object = JSON.parse("{}");
            object["pb"] = this.pageBreakEnabled;
            return object;
        };
        KASQuestionConfig.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var config = new KASQuestionConfig();
            if (object.hasOwnProperty("pb")) {
                config.pageBreakEnabled = object["pb"];
            }
            return config;
        };
        return KASQuestionConfig;
    }());
    KASClient.KASQuestionConfig = KASQuestionConfig;
})(KASClient || (KASClient = {}));
/// <reference path="./KASQuestionConfig.ts" />
var KASClient;
(function (KASClient) {
    var KASAttachmentListQuestionConfig = (function (_super) {
        __extends(KASAttachmentListQuestionConfig, _super);
        function KASAttachmentListQuestionConfig() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.maxImageCount = 10;
            return _this;
        }
        KASAttachmentListQuestionConfig.prototype.toJSON = function () {
            var object = _super.prototype.toJSON.call(this);
            object[KASAttachmentListQuestionConfig.MAX_IMAGE_COUNT_KEY] = this.maxImageCount;
            return object;
        };
        KASAttachmentListQuestionConfig.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var config = KASClient.KASQuestionConfig.fromJSON(object);
            var attachmentListConfig = new KASAttachmentListQuestionConfig();
            attachmentListConfig.pageBreakEnabled = config.pageBreakEnabled;
            if (object.hasOwnProperty(KASAttachmentListQuestionConfig.MAX_IMAGE_COUNT_KEY)) {
                attachmentListConfig.maxImageCount = object[KASAttachmentListQuestionConfig.MAX_IMAGE_COUNT_KEY];
            }
            return attachmentListConfig;
        };
        // Config to denote what picker sources to show in image type question
        KASAttachmentListQuestionConfig.MAX_IMAGE_COUNT_KEY = "mic";
        return KASAttachmentListQuestionConfig;
    }(KASClient.KASQuestionConfig));
    KASClient.KASAttachmentListQuestionConfig = KASAttachmentListQuestionConfig;
})(KASClient || (KASClient = {}));
/**
 * The following enum values MUST be in sync with the AttachmentType enum representation in iOS and Android code.
 * This is vital for proper serialization and deserialization over the KAS bridge.
 */
var KASClient;
(function (KASClient) {
    var KASAttachmentType;
    (function (KASAttachmentType) {
        KASAttachmentType[KASAttachmentType["Image"] = 1] = "Image";
        KASAttachmentType[KASAttachmentType["Audio"] = 2] = "Audio";
        KASAttachmentType[KASAttachmentType["Video"] = 6] = "Video";
        KASAttachmentType[KASAttachmentType["Document"] = 3] = "Document";
        KASAttachmentType[KASAttachmentType["Generic"] = 99] = "Generic";
    })(KASAttachmentType = KASClient.KASAttachmentType || (KASClient.KASAttachmentType = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASAudioAttachment = (function (_super) {
        __extends(KASAudioAttachment, _super);
        function KASAudioAttachment() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.duration = 0;
            return _this;
        }
        KASAudioAttachment.prototype.toJSON = function () {
            var object = _super.prototype.toJSON.call(this);
            object["duration"] = this.duration;
            return object;
        };
        KASAudioAttachment.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var attachment = new KASAudioAttachment();
            this.populateModelFromJSON(attachment, object);
            return attachment;
        };
        KASAudioAttachment.populateModelFromJSON = function (attachment, object) {
            _super.populateModelFromJSON.call(this, attachment, object);
            attachment.type = KASClient.KASAttachmentType.Audio;
            if (object.hasOwnProperty("duration")) {
                attachment.duration = object["duration"];
            }
        };
        return KASAudioAttachment;
    }(KASClient.KASAttachment));
    KASClient.KASAudioAttachment = KASAudioAttachment;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASAudioViewModel = (function (_super) {
        __extends(KASAudioViewModel, _super);
        function KASAudioViewModel() {
            var _this = _super.call(this) || this;
            _this.audioObj = null;
            return _this;
        }
        return KASAudioViewModel;
    }(KASClient.KASAttachmentViewModel));
    KASClient.KASAudioViewModel = KASAudioViewModel;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASDocumentViewModel = (function (_super) {
        __extends(KASDocumentViewModel, _super);
        function KASDocumentViewModel() {
            var _this = _super.call(this) || this;
            _this.documentObj = null;
            return _this;
        }
        return KASDocumentViewModel;
    }(KASClient.KASAttachmentViewModel));
    KASClient.KASDocumentViewModel = KASDocumentViewModel;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASDropDownModel = (function () {
        function KASDropDownModel(options, selectedOptionIndexes, isSearchEnabled, isMultiSelect) {
            if (isSearchEnabled === void 0) { isSearchEnabled = false; }
            if (isMultiSelect === void 0) { isMultiSelect = false; }
            this.optionsAsStrings = [];
            this.isSearchEnabled = false;
            this.selectedOptionIndexes = [];
            this.isMutliSelect = false;
            this.optionsAsStrings = options;
            this.isSearchEnabled = isSearchEnabled;
            this.selectedOptionIndexes = selectedOptionIndexes;
            this.isMutliSelect = isMultiSelect;
        }
        return KASDropDownModel;
    }());
    KASClient.KASDropDownModel = KASDropDownModel;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASForm = (function () {
        function KASForm() {
            // Form id, shouldn't be changed
            this.id = "";
            // Associated conversation id, shouldn't be changed
            this.conversationId = "";
            // Package id of the MiniApp, shouldn't be changed
            this.packageId = "";
            // User id who created the form, shouldn't be changed
            this.creatorId = "";
            // Form title
            this.title = "";
            // If the form is anonymous, default is false
            this.isAnonymous = false;
            // Expiry time of the form
            this.expiry = 0;
            // Version of the form, default value is 2, shouldn't be changed
            this.version = 2;
            // Who can see the summary of the form, default value is All
            this.visibility = KASClient.KASFormResultVisibility.All;
            // Denotes if multiple responses from a user are allowed or not, default is false
            this.isResponseAppended = false;
            // Denotes if participants' location is attached with the response or not, default is false
            this.isLocationRequested = false;
            // Type of the form, default is 20, shouldn't be changed
            this.type = 20;
            // Report Type of survey, default is 0, for job it should be 1
            this.reportType = 0;
            // All the questions associated with the form
            this.questions = [];
            // A list of metadata associated with the form
            this.properties = [];
        }
        KASForm.prototype.toJSON = function () {
            var object = JSON.parse("{}");
            object["id"] = this.id;
            object["gid"] = this.conversationId;
            object["pid"] = this.packageId;
            object["creatorId"] = this.creatorId;
            object["title"] = this.title;
            object["ann"] = this.isAnonymous;
            object["exp"] = this.expiry;
            object["ver"] = this.version;
            object["vis"] = this.visibility;
            object["ira"] = this.isResponseAppended;
            object["ilr"] = this.isLocationRequested;
            object["type"] = this.type;
            object["rpt"] = this.reportType;
            var questions = [];
            for (var i = 0; i < this.questions.length; i++) {
                questions.push(this.questions[i].toJSON());
            }
            object["ques"] = questions;
            var properties = [];
            for (var i = 0; i < this.properties.length; i++) {
                properties.push(this.properties[i].toJSON());
            }
            object["smd"] = properties;
            return object;
        };
        KASForm.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var form = new KASForm();
            form.json = object; // Required for debugging
            if (object.hasOwnProperty("id")) {
                form.id = object["id"];
            }
            if (object.hasOwnProperty("gid")) {
                form.conversationId = object["gid"];
            }
            if (object.hasOwnProperty("pid")) {
                form.packageId = object["pid"];
            }
            if (object.hasOwnProperty("creatorId")) {
                form.creatorId = object["creatorId"];
            }
            if (object.hasOwnProperty("title")) {
                form.title = object["title"];
            }
            if (object.hasOwnProperty("ann")) {
                form.isAnonymous = object["ann"];
            }
            form.expiry = object["exp"];
            if (object.hasOwnProperty("ver")) {
                form.version = object["ver"];
            }
            if (object.hasOwnProperty("vis")) {
                form.visibility = object["vis"];
            }
            if (object.hasOwnProperty("ira")) {
                form.isResponseAppended = object["ira"];
            }
            if (object.hasOwnProperty("ilr")) {
                form.isLocationRequested = object["ilr"];
            }
            if (object.hasOwnProperty("type")) {
                form.type = object["type"];
            }
            if (object.hasOwnProperty("rpt")) {
                form.reportType = object["rpt"];
            }
            if (object.hasOwnProperty("ques")) {
                var questions = object["ques"];
                for (var i = 0; i < questions.length; i++) {
                    form.questions.push(KASClient.KASQuestion.fromJSON(questions[i]));
                }
            }
            if (object.hasOwnProperty("smd")) {
                var properties = object["smd"];
                for (var i = 0; i < properties.length; i++) {
                    form.properties.push(KASClient.KASFormProperty.fromJSON(properties[i]));
                }
            }
            return form;
        };
        return KASForm;
    }());
    KASClient.KASForm = KASForm;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var FormStatus;
    (function (FormStatus) {
        FormStatus[FormStatus["Active"] = 0] = "Active";
        FormStatus[FormStatus["Closed"] = 1] = "Closed";
        FormStatus[FormStatus["Expired"] = 2] = "Expired";
    })(FormStatus = KASClient.FormStatus || (KASClient.FormStatus = {}));
    var KASFormAggregatedSummary = (function () {
        function KASFormAggregatedSummary() {
            // The id of the associated form, shouldn't be changed
            this.formId = "";
            this.formStatus = FormStatus.Active;
            // How many total responses were received for the form, considering multiple responses from one person
            this.totalResponseCount = 0;
            // How many participants responded on it
            this.totalParticipantsCount = 0;
            // How many in the conversation were assigned to respond to this form
            this.targetResponderCount = 0;
            // Dictionary<QuestionId: number, Result: any>
            // The result will depend on question type:
            // For numeric, it's Dictionary<s/a : string, SumOrAverage: number>
            // For MCQ, it's Dictionary<OptionId: number, HowManySelectedThatOption: number>
            // For rest, it's Array<answer: any>
            this.result = {};
        }
        KASFormAggregatedSummary.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var summary = new KASFormAggregatedSummary();
            summary.json = object;
            if (object.hasOwnProperty("id")) {
                summary.formId = object["id"];
            }
            if (object.hasOwnProperty("st")) {
                summary.formStatus = object["st"];
            }
            if (object.hasOwnProperty("rc")) {
                summary.totalResponseCount = object["rc"];
            }
            if (object.hasOwnProperty("pc")) {
                summary.totalParticipantsCount = object["pc"];
            }
            if (object.hasOwnProperty("tc")) {
                summary.targetResponderCount = object["tc"];
            }
            if (object.hasOwnProperty("rs")) {
                summary.result = object["rs"];
            }
            return summary;
        };
        return KASFormAggregatedSummary;
    }());
    KASClient.KASFormAggregatedSummary = KASFormAggregatedSummary;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormFlatSummary = (function () {
        function KASFormFlatSummary() {
            // The id of the associated form, shouldn't be changed
            this.formId = "";
            // The id of the associated conversation, shouldn't be changed
            this.conversationId = "";
            // Dictionary<UserId: string, Respones: Dictionary<QuestionId: number, Answers: Array<string>>>
            this.userIdToResponsesMap = {};
            this.isResponseAppended = false;
        }
        /**
        * Gets all the user ids who responded to the form
        * @return {string[]} list of all the responded user ids
        */
        KASFormFlatSummary.prototype.getRespondedUserIds = function () {
            return Object.keys(this.userIdToResponsesMap);
        };
        /**
        * Gets all the responses of a user against a specific question
        * @param {string} userId the unique id of the user
        * @param {string} questionId the id of the question
        * @return {[]} list of all answers given by the user for that question
        */
        KASFormFlatSummary.prototype.getQuestionResponsesForUserId = function (userId, questionId) {
            var questionResponsesString = this.userIdToResponsesMap[userId][questionId];
            var questionResponses = [];
            if (this.isResponseAppended) {
                questionResponses = JSON.parse(questionResponsesString);
            }
            else {
                questionResponses.push(questionResponsesString);
            }
            return questionResponses;
        };
        /**
        * Gets all the responses of a user to a form
        * @param {string} userId the unique id of the user
        * @return {Dictionary<QuestionId: number, Answers: Array<string>>} question id to list of answers
        */
        KASFormFlatSummary.prototype.getResponsesForUserId = function (userId) {
            var userResponses = {};
            for (var questionId in this.userIdToResponsesMap[userId]) {
                var questionResponses = this.getQuestionResponsesForUserId(userId, parseInt(questionId));
                userResponses[questionId] = questionResponses;
            }
            return userResponses;
        };
        /**
        * Gets all the responses of all the users
        * @return {Dictionary<UserId: string, Responses: Array<<Dictionary<QuestionId: string, Answer: string>>>>}
        */
        KASFormFlatSummary.prototype.getAllResponses = function () {
            var allResponses = JSON.parse("{}");
            var respondedUserIds = this.getRespondedUserIds();
            for (var i = 0; i < respondedUserIds.length; i++) {
                var userId = respondedUserIds[i];
                allResponses[userId] = [];
                // Dictionary<QuestionId: string, Answers: Array<string>>
                var userResponses = this.getResponsesForUserId(userId);
                var questionIds = Object.keys(this.userIdToResponsesMap[userId]);
                var userResponsesForFirstQuestion = this.getQuestionResponsesForUserId(userId, parseInt(questionIds[0]));
                var userResponseCount = userResponsesForFirstQuestion.length;
                for (var r = 0; r < userResponseCount; r++) {
                    var response = {};
                    for (var j = 0; j < questionIds.length; j++) {
                        var questionId = questionIds[j];
                        var answer = userResponses[questionId][r];
                        response[questionId] = answer;
                    }
                    allResponses[userId].push(response);
                }
            }
            return allResponses;
        };
        /**
        * Gets number of all responses by all users
        * @return {number} number of all responses
        */
        KASFormFlatSummary.prototype.getTotalResponseCount = function () {
            var totalResponseCount = 0;
            var allResponses = this.getAllResponses();
            for (var userId in allResponses) {
                totalResponseCount += allResponses[userId].length;
            }
            return totalResponseCount;
        };
        KASFormFlatSummary.fromJSON = function (object, isResponseAppended) {
            if (object == null) {
                return null;
            }
            var summary = new KASFormFlatSummary();
            summary.json = object; // Required for debugging
            if (object.hasOwnProperty("id")) {
                summary.formId = object["id"];
            }
            if (object.hasOwnProperty("gid")) {
                summary.conversationId = object["gid"];
            }
            if (object.hasOwnProperty("frsps")) {
                summary.userIdToResponsesMap = object["frsps"];
            }
            summary.isResponseAppended = isResponseAppended;
            return summary;
        };
        return KASFormFlatSummary;
    }());
    KASClient.KASFormFlatSummary = KASFormFlatSummary;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormMessageSendStatus;
    (function (KASFormMessageSendStatus) {
        // Default type
        KASFormMessageSendStatus[KASFormMessageSendStatus["Unknown"] = 0] = "Unknown";
        // Message is in transit
        KASFormMessageSendStatus[KASFormMessageSendStatus["InProgress"] = 1] = "InProgress";
        // Sending is failed
        KASFormMessageSendStatus[KASFormMessageSendStatus["Error"] = 2] = "Error";
        // Message got delivered successfully
        KASFormMessageSendStatus[KASFormMessageSendStatus["Success"] = 3] = "Success";
    })(KASFormMessageSendStatus = KASClient.KASFormMessageSendStatus || (KASClient.KASFormMessageSendStatus = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormProcessedSummary = (function () {
        function KASFormProcessedSummary() {
            // How many in the conversation did not respond
            this.nonRespondersInConversation = [];
            // How many in the conversation were assigned to respond to this form
            this.targetResponderCount = 0;
            // How many total responses were received for the form, considering multiple responses from one person
            this.totalResponseCount = 0;
            // Aggregated result for aggregative questions
            // Dictionary<QuestionId: number, Result: KASQuestionResult>
            this.results = {};
        }
        KASFormProcessedSummary.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var result = new KASFormProcessedSummary();
            result.json = object;
            if (object.hasOwnProperty("NonRespondersInGroup")) {
                result.nonRespondersInConversation = object["NonRespondersInGroup"];
            }
            if (object.hasOwnProperty("TargetResponderCount")) {
                result.targetResponderCount = object["TargetResponderCount"];
            }
            if (object.hasOwnProperty("TotalResponseCount")) {
                result.totalResponseCount = object["TotalResponseCount"];
            }
            if (object.hasOwnProperty("Results")) {
                result.results = JSON.parse("{}");
                for (var questionId in object["Results"]) {
                    var questionResult = KASClient.KASQuestionResult.fromJSON(object["Results"][questionId]);
                    if (questionResult.questionType == KASClient.KASQuestionType.SingleSelect ||
                        questionResult.questionType == KASClient.KASQuestionType.MultiSelect ||
                        questionResult.questionType == KASClient.KASQuestionType.SingleSelectExternal) {
                        result.results[questionId] = KASClient.KASOptionQuestionResult.fromJSON(object["Results"][questionId]);
                    }
                    else if (questionResult.questionType == KASClient.KASQuestionType.Numeric) {
                        result.results[questionId] = KASClient.KASNumericQuestionResult.fromJSON(object["Results"][questionId]);
                    }
                }
            }
            return result;
        };
        return KASFormProcessedSummary;
    }());
    KASClient.KASFormProcessedSummary = KASFormProcessedSummary;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormProperty = (function () {
        function KASFormProperty() {
            // Name of the metadata
            this.name = "";
            // Type of the metadata
            this.type = KASClient.KASFormPropertyType.Text;
            // Value of the metadata
            this.value = "";
        }
        KASFormProperty.prototype.toJSON = function () {
            var object = JSON.parse('{}');
            object["n"] = this.name;
            object["t"] = this.type;
            object["v"] = this.value;
            return object;
        };
        KASFormProperty.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var property = new KASFormProperty();
            if (object.hasOwnProperty("n")) {
                property.name = object["n"];
            }
            if (object.hasOwnProperty("t")) {
                property.type = object["t"];
            }
            if (object.hasOwnProperty("v")) {
                property.value = object["v"];
            }
            return property;
        };
        return KASFormProperty;
    }());
    KASClient.KASFormProperty = KASFormProperty;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormPropertyFactory = (function () {
        function KASFormPropertyFactory() {
        }
        KASFormPropertyFactory.getAttachmentListProperty = function (selectedAttachments, name) {
            var attachmentProperty = new KASClient.KASFormProperty();
            attachmentProperty.name = name;
            attachmentProperty.type = KASClient.KASFormPropertyType.AttachmentList;
            attachmentProperty.value = JSON.stringify(selectedAttachments);
            return attachmentProperty;
        };
        return KASFormPropertyFactory;
    }());
    KASClient.KASFormPropertyFactory = KASFormPropertyFactory;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormPropertyType;
    (function (KASFormPropertyType) {
        // Any text is allowed as the metadata value
        KASFormPropertyType[KASFormPropertyType["Text"] = 0] = "Text";
        // Only numbers are allowed as the metadata value
        KASFormPropertyType[KASFormPropertyType["Numeric"] = 1] = "Numeric";
        // Location type as the metadata value
        KASFormPropertyType[KASFormPropertyType["Location"] = 2] = "Location";
        // Date time as the metadata value
        KASFormPropertyType[KASFormPropertyType["DateTime"] = 3] = "DateTime";
        // Array of strings as the metadata value
        KASFormPropertyType[KASFormPropertyType["Array"] = 4] = "Array";
        // Attachment path as the metadata value
        KASFormPropertyType[KASFormPropertyType["Attachment"] = 5] = "Attachment";
        // Set (unique list) of strings as the metadata value
        KASFormPropertyType[KASFormPropertyType["Set"] = 6] = "Set";
        // List of KASAttachment as metadata value
        KASFormPropertyType[KASFormPropertyType["AttachmentList"] = 7] = "AttachmentList";
    })(KASFormPropertyType = KASClient.KASFormPropertyType || (KASClient.KASFormPropertyType = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    /* THIS FILE SHOULD BE SIMILAR TO Apps/React/React/Storage/datamodels/Survey/SurveyMetadataUpdateFactory.m */
    var KASFormPropertyUpdateFactory = (function () {
        function KASFormPropertyUpdateFactory() {
        }
        KASFormPropertyUpdateFactory.updateValueInProperty = function (newValue, property) {
            var updateInfo = new KASClient.KASFormPropertyUpdateInfo();
            updateInfo.name = property.name;
            updateInfo.type = property.type;
            updateInfo.value = newValue;
            updateInfo.operation = KASClient.KASFormPropertyUpdateOperation.UpdateValue;
            return updateInfo;
        };
        KASFormPropertyUpdateFactory.addProperty = function (property) {
            var updateInfo = new KASClient.KASFormPropertyUpdateInfo();
            updateInfo.name = property.name;
            updateInfo.type = property.type;
            updateInfo.value = property.value;
            updateInfo.operation = KASClient.KASFormPropertyUpdateOperation.AddProperty;
            return updateInfo;
        };
        KASFormPropertyUpdateFactory.deleteProperty = function (property) {
            var updateInfo = new KASClient.KASFormPropertyUpdateInfo();
            updateInfo.name = property.name;
            updateInfo.type = property.type;
            updateInfo.operation = KASClient.KASFormPropertyUpdateOperation.DeleteProperty;
            return updateInfo;
        };
        KASFormPropertyUpdateFactory.replaceEntryInPropertyValue = function (oldEntry, newEntry, property) {
            if (property.type != KASClient.KASFormPropertyType.Array && property.type != KASClient.KASFormPropertyType.Set) {
                return null;
            }
            var updateInfo = new KASClient.KASFormPropertyUpdateInfo();
            updateInfo.name = property.name;
            updateInfo.type = property.type;
            updateInfo.value = JSON.stringify({ "o": oldEntry, "n": newEntry });
            updateInfo.operation = KASClient.KASFormPropertyUpdateOperation.ReplaceEntryInValue;
            return updateInfo;
        };
        KASFormPropertyUpdateFactory.addEntriesInPropertyValue = function (entries, property) {
            if (property.type != KASClient.KASFormPropertyType.Array && property.type != KASClient.KASFormPropertyType.Set) {
                return null;
            }
            var updateInfo = new KASClient.KASFormPropertyUpdateInfo();
            updateInfo.name = property.name;
            updateInfo.type = property.type;
            updateInfo.value = JSON.stringify(entries);
            updateInfo.operation = KASClient.KASFormPropertyUpdateOperation.AddEntriesInValue;
            return updateInfo;
        };
        KASFormPropertyUpdateFactory.deleteEntriesFromPropertyValue = function (entries, property) {
            if (property.type != KASClient.KASFormPropertyType.Array && property.type != KASClient.KASFormPropertyType.Set) {
                return null;
            }
            var updateInfo = new KASClient.KASFormPropertyUpdateInfo();
            updateInfo.name = property.name;
            updateInfo.type = property.type;
            updateInfo.value = JSON.stringify(entries);
            updateInfo.operation = KASClient.KASFormPropertyUpdateOperation.DeleteEntriesFromValue;
            return updateInfo;
        };
        return KASFormPropertyUpdateFactory;
    }());
    KASClient.KASFormPropertyUpdateFactory = KASFormPropertyUpdateFactory;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    /* THIS FILE SHOULD BE SIMILAR TO Apps/React/React/Storage/datamodels/Survey/SurveyMetadataUpdateInfo.m */
    var KASFormPropertyUpdateInfo = (function () {
        function KASFormPropertyUpdateInfo() {
            // Name of the metadata
            this.name = "";
            // Type of the metadata
            this.type = KASClient.KASFormPropertyType.Text;
            // Value for this update
            this.value = "";
            // Operation for this update
            this.operation = KASClient.KASFormPropertyUpdateOperation.UpdateValue;
        }
        KASFormPropertyUpdateInfo.prototype.toJSON = function () {
            var object = JSON.parse('{}');
            object["n"] = this.name;
            object["t"] = this.type;
            object["v"] = this.value;
            object["o"] = this.operation;
            return object;
        };
        return KASFormPropertyUpdateInfo;
    }());
    KASClient.KASFormPropertyUpdateInfo = KASFormPropertyUpdateInfo;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    /* THIS FILE SHOULD BE SIMILAR TO Apps/React/React/Storage/datamodels/Survey/SurveyMetadataUpdateInfo.h */
    var KASFormPropertyUpdateOperation;
    (function (KASFormPropertyUpdateOperation) {
        // Replace the old property value with a new one
        KASFormPropertyUpdateOperation[KASFormPropertyUpdateOperation["UpdateValue"] = 0] = "UpdateValue";
        // Add a whole new property
        KASFormPropertyUpdateOperation[KASFormPropertyUpdateOperation["AddProperty"] = 1] = "AddProperty";
        // Delete a whole property
        KASFormPropertyUpdateOperation[KASFormPropertyUpdateOperation["DeleteProperty"] = 2] = "DeleteProperty";
        // Replace an entry in the property value (Array type) with a new one
        KASFormPropertyUpdateOperation[KASFormPropertyUpdateOperation["ReplaceEntryInValue"] = 3] = "ReplaceEntryInValue";
        // Add entries in the property value (Array type)
        KASFormPropertyUpdateOperation[KASFormPropertyUpdateOperation["AddEntriesInValue"] = 4] = "AddEntriesInValue";
        // Delete entries from the property value (Array type)
        KASFormPropertyUpdateOperation[KASFormPropertyUpdateOperation["DeleteEntriesFromValue"] = 5] = "DeleteEntriesFromValue";
    })(KASFormPropertyUpdateOperation = KASClient.KASFormPropertyUpdateOperation || (KASClient.KASFormPropertyUpdateOperation = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormReaction = (function () {
        function KASFormReaction() {
            // Denotes whether to show likes and comments
            this.shouldShowLikesAndComments = true;
            // Number of likes received for the form
            this.likesCount = 0;
            // Number of comments received for the form
            this.commentsCount = 0;
            // Denotes whether the current user has already liked or not
            this.didILike = false;
            // Denotes whether to show comments or not
            this.hideComments = false;
        }
        KASFormReaction.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var reaction = new KASFormReaction();
            if (object.hasOwnProperty("shouldShowLikesAndComments")) {
                reaction.shouldShowLikesAndComments = object["shouldShowLikesAndComments"];
            }
            // Populate like and comment data only if we have to show it
            if (reaction.shouldShowLikesAndComments) {
                if (object.hasOwnProperty("likesCount")) {
                    reaction.likesCount = object["likesCount"];
                }
                if (object.hasOwnProperty("commentsCount")) {
                    reaction.commentsCount = object["commentsCount"];
                }
                if (object.hasOwnProperty("didILike")) {
                    reaction.didILike = object["didILike"];
                }
                if (object.hasOwnProperty("hideComments")) {
                    reaction.hideComments = object["hideComments"];
                }
            }
            return reaction;
        };
        return KASFormReaction;
    }());
    KASClient.KASFormReaction = KASFormReaction;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormResponse = (function () {
        function KASFormResponse() {
            // A unique response id, required in case of updating an existing response
            this.id = "";
            // Response message send status
            this.sendStatus = KASClient.KASFormMessageSendStatus.Unknown;
            // Response send time
            this.sendTime = 0;
            // A map for serverUrl against localUrl of all the image attachments to a response
            // Dictionary<ServerUrl: string, LocalUrl: string>
            this.serverToLocalAssetUrlMap = {};
            // A map of question id to answer
            // Dictionary<QuestionId: number, Answer: string>
            this.questionToAnswerMap = {};
        }
        KASFormResponse.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var response = new KASFormResponse();
            if (object.hasOwnProperty("response_Id_native")) {
                response.id = object["response_Id_native"];
            }
            if (object.hasOwnProperty("response_send_status")) {
                response.sendStatus = object["response_send_status"];
            }
            if (object.hasOwnProperty("response_send_time")) {
                response.sendTime = object["response_send_time"];
            }
            if (object.hasOwnProperty("response_assetmap_native")) {
                response.serverToLocalAssetUrlMap = KASClient.parseJsonObject(object["response_assetmap_native"]);
            }
            if (object.hasOwnProperty("response_payload_native")) {
                response.questionToAnswerMap = KASClient.parseJsonObject(object["response_payload_native"]);
            }
            return response;
        };
        return KASFormResponse;
    }());
    KASClient.KASFormResponse = KASFormResponse;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASFormResultVisibility;
    (function (KASFormResultVisibility) {
        // Form summary is visible to everyone in the conversation
        KASFormResultVisibility[KASFormResultVisibility["All"] = 0] = "All";
        // Summary is visible to only the creator of the form
        KASFormResultVisibility[KASFormResultVisibility["Sender"] = 1] = "Sender";
        // Summary is visible to all the admins of the conversation
        KASFormResultVisibility[KASFormResultVisibility["Admin"] = 2] = "Admin";
    })(KASFormResultVisibility = KASClient.KASFormResultVisibility || (KASClient.KASFormResultVisibility = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASImageAttachment = (function (_super) {
        __extends(KASImageAttachment, _super);
        function KASImageAttachment() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.hasSetThumbnail = false;
            _this.width = 0;
            _this.height = 0;
            _this.thumbnail = "";
            return _this;
        }
        KASImageAttachment.prototype.toJSON = function () {
            var object = _super.prototype.toJSON.call(this);
            object["iw"] = this.width;
            object["ih"] = this.height;
            object["th"] = this.hasSetThumbnail;
            object["tib"] = this.thumbnail;
            return object;
        };
        KASImageAttachment.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var attachment = new KASImageAttachment();
            this.populateModelFromJSON(attachment, object);
            return attachment;
        };
        KASImageAttachment.populateModelFromJSON = function (attachment, object) {
            _super.populateModelFromJSON.call(this, attachment, object);
            attachment.type = KASClient.KASAttachmentType.Image;
            if (object.hasOwnProperty("tib")) {
                attachment.thumbnail = object["tib"];
            }
            if (object.hasOwnProperty("th")) {
                attachment.hasSetThumbnail = object["th"];
            }
            if (object.hasOwnProperty("iw")) {
                attachment.width = object["iw"];
            }
            if (object.hasOwnProperty("ih")) {
                attachment.height = object["iw"];
            }
        };
        return KASImageAttachment;
    }(KASClient.KASAttachment));
    KASClient.KASImageAttachment = KASImageAttachment;
})(KASClient || (KASClient = {}));
/// <reference path="./KASQuestionConfig.ts" />
var KASClient;
(function (KASClient) {
    var ImagePickerSource;
    (function (ImagePickerSource) {
        // All sources (Gallery, Camera) will be shown in picker
        ImagePickerSource[ImagePickerSource["All"] = 0] = "All";
        // Only Camera will be shown in picker, by default front camera will launch
        ImagePickerSource[ImagePickerSource["CameraFront"] = 1] = "CameraFront";
        // Only Camera will be shown in picker, by default back camera will launch
        ImagePickerSource[ImagePickerSource["CameraBack"] = 2] = "CameraBack";
    })(ImagePickerSource = KASClient.ImagePickerSource || (KASClient.ImagePickerSource = {}));
    var KASImageQuestionConfig = (function (_super) {
        __extends(KASImageQuestionConfig, _super);
        function KASImageQuestionConfig() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.imageSource = ImagePickerSource.All;
            return _this;
        }
        KASImageQuestionConfig.prototype.toJSON = function () {
            var object = _super.prototype.toJSON.call(this);
            object[KASImageQuestionConfig.IMAGE_SOURCE_KEY] = this.imageSource;
            return object;
        };
        KASImageQuestionConfig.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var config = KASClient.KASQuestionConfig.fromJSON(object);
            var imageConfig = new KASImageQuestionConfig();
            imageConfig.pageBreakEnabled = config.pageBreakEnabled;
            if (object.hasOwnProperty(KASImageQuestionConfig.IMAGE_SOURCE_KEY)) {
                imageConfig.imageSource = object[KASImageQuestionConfig.IMAGE_SOURCE_KEY];
            }
            return imageConfig;
        };
        // Config to denote what picker sources to show in image type question
        KASImageQuestionConfig.IMAGE_SOURCE_KEY = "is";
        return KASImageQuestionConfig;
    }(KASClient.KASQuestionConfig));
    KASClient.KASImageQuestionConfig = KASImageQuestionConfig;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASLocation = (function () {
        function KASLocation() {
            // Latitude of the location
            this.latitude = 0;
            // Longitude of the location
            this.longitude = 0;
            // Name of the location
            this.placeName = "";
            // Address of the location
            this.placeAddress = "";
        }
        KASLocation.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var location = new KASLocation();
            if (object.hasOwnProperty("lt")) {
                location.latitude = object["lt"];
            }
            if (object.hasOwnProperty("lg")) {
                location.longitude = object["lg"];
            }
            if (object.hasOwnProperty("n")) {
                location.placeName = object["n"];
            }
            if (object.hasOwnProperty("a")) {
                location.placeAddress = object["a"];
            }
            return location;
        };
        KASLocation.prototype.toJSON = function () {
            var object = JSON.parse("{}");
            object["lt"] = this.latitude;
            object["lg"] = this.longitude;
            object["n"] = this.placeName;
            object["a"] = this.placeAddress;
            return object;
        };
        return KASLocation;
    }());
    KASClient.KASLocation = KASLocation;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASQuestionResult = (function () {
        function KASQuestionResult() {
            // Title of the question
            this.questionTitle = "";
            // Type of the question
            this.questionType = KASClient.KASQuestionType.None;
            // Index of the question
            this.questionId = 0;
        }
        KASQuestionResult.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var questionResult = new KASQuestionResult();
            if (object.hasOwnProperty("QuestionText")) {
                questionResult.questionTitle = object["QuestionText"];
            }
            if (object.hasOwnProperty("Type")) {
                questionResult.questionType = object["Type"];
            }
            if (object.hasOwnProperty("QuestionId")) {
                questionResult.questionId = object["QuestionId"];
            }
            return questionResult;
        };
        return KASQuestionResult;
    }());
    KASClient.KASQuestionResult = KASQuestionResult;
})(KASClient || (KASClient = {}));
/// <reference path="./KASQuestionResult.ts" />
var KASClient;
(function (KASClient) {
    var KASNumericQuestionResult = (function (_super) {
        __extends(KASNumericQuestionResult, _super);
        function KASNumericQuestionResult() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // For Numeric questions the aggregated result will be sum, and average of all the responses
            _this.sum = 0;
            _this.average = 0;
            return _this;
        }
        KASNumericQuestionResult.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var questionResult = KASClient.KASQuestionResult.fromJSON(object);
            var numericQuestionResult = new KASNumericQuestionResult();
            numericQuestionResult.questionTitle = questionResult.questionTitle;
            numericQuestionResult.questionType = questionResult.questionType;
            numericQuestionResult.questionId = questionResult.questionId;
            if (object.hasOwnProperty("Sum")) {
                numericQuestionResult.sum = object["Sum"];
            }
            if (object.hasOwnProperty("Average")) {
                numericQuestionResult.average = object["Average"];
            }
            return numericQuestionResult;
        };
        return KASNumericQuestionResult;
    }(KASClient.KASQuestionResult));
    KASClient.KASNumericQuestionResult = KASNumericQuestionResult;
})(KASClient || (KASClient = {}));
/// <reference path="./KASQuestionResult.ts" />
var KASClient;
(function (KASClient) {
    var KASOptionQuestionResult = (function (_super) {
        __extends(KASOptionQuestionResult, _super);
        function KASOptionQuestionResult() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // For SingleSelect/MultiSelect question, the result will be option id versus their counts
            // Dictionary<OptionId: number, OptionResult: KASOptionResult>
            _this.optionResults = {};
            return _this;
        }
        /**
        * Gets all the option ids sorted in their total responses count (descending)
        * @return {number[]} list of all the option ids
        */
        KASOptionQuestionResult.prototype.getResultsOrder = function () {
            var _this = this;
            var allOptionIds = Object.keys(this.optionResults);
            allOptionIds.sort(function (id1, id2) {
                var responseCount1 = _this.optionResults[id1].totalResponsesCount;
                var responseCount2 = _this.optionResults[id2].totalResponsesCount;
                return (responseCount2 - responseCount1);
            });
            var allOptionIdNumbers = [];
            for (var i = 0; i < allOptionIds.length; i++) {
                allOptionIdNumbers.push(parseInt(allOptionIds[i]));
            }
            return allOptionIdNumbers;
        };
        KASOptionQuestionResult.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var questionResult = KASClient.KASQuestionResult.fromJSON(object);
            var optionQuestionResult = new KASOptionQuestionResult();
            optionQuestionResult.questionTitle = questionResult.questionTitle;
            optionQuestionResult.questionType = questionResult.questionType;
            optionQuestionResult.questionId = questionResult.questionId;
            if (object.hasOwnProperty("OptionResults")) {
                optionQuestionResult.optionResults = JSON.parse("{}");
                for (var optionId in object["OptionResults"]) {
                    optionQuestionResult.optionResults[optionId] = KASClient.KASOptionResult.fromJSON(object["OptionResults"][optionId]);
                }
            }
            return optionQuestionResult;
        };
        return KASOptionQuestionResult;
    }(KASClient.KASQuestionResult));
    KASClient.KASOptionQuestionResult = KASOptionQuestionResult;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASOptionResult = (function () {
        function KASOptionResult() {
            // Title of the option
            this.optionTitle = "";
            // Index of the option
            this.optionId = 0;
            // How many have chosen this option
            this.totalResponsesCount = 0;
            // A map of user ids against their response count
            // Dictionary<UserId: string, ResponseCount: number>
            this.responderToResponseCount = {};
        }
        KASOptionResult.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var optionResult = new KASOptionResult();
            if (object.hasOwnProperty("AnswerText")) {
                optionResult.optionTitle = object["AnswerText"];
            }
            if (object.hasOwnProperty("AnsId")) {
                optionResult.optionId = object["AnsId"];
            }
            if (object.hasOwnProperty("TotalResponsesCount")) {
                optionResult.totalResponsesCount = object["TotalResponsesCount"];
            }
            if (object.hasOwnProperty("Responders")) {
                optionResult.responderToResponseCount = JSON.parse("{}");
                var totalResponsesCount = 0;
                for (var i in object["Responders"]) {
                    var responderJson = object["Responders"][i];
                    var responderId = responderJson["Id"];
                    var responseCount = responderJson["ResponseCount"];
                    totalResponsesCount += responseCount;
                    optionResult.responderToResponseCount[responderId] = responseCount;
                }
                if (totalResponsesCount != optionResult.totalResponsesCount) {
                    optionResult.totalResponsesCount = totalResponsesCount;
                }
            }
            return optionResult;
        };
        return KASOptionResult;
    }());
    KASClient.KASOptionResult = KASOptionResult;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASQuestion = (function () {
        function KASQuestion() {
            // Index of the question, starts with 0
            this.id = 0;
            // Title of the question
            this.title = "";
            // Type of the question
            this.type = KASClient.KASQuestionType.None;
            // Configuration/behaviour of a question
            this.config = null;
            // Display type of the question's options
            this.displayType = KASClient.KASQuestionDisplayType.None;
            // Denotes if the question should be invisible to the responder, default is false
            this.isInvisible = false;
            // Denotes if the question can be edited by the responder, default is true
            this.isEditable = true;
            // Denotes if the question will be skipped from all sorts of reporting
            this.isExcludedFromReporting = false;
            // List of options for the question
            this.options = [];
        }
        KASQuestion.prototype.toJSON = function () {
            var object = JSON.parse("{}");
            object["id"] = this.id;
            object["title"] = this.title;
            object["type"] = this.type;
            object["invis"] = this.isInvisible;
            object["editable"] = this.isEditable;
            object["er"] = this.isExcludedFromReporting;
            object["dt"] = this.displayType;
            if (this.config != null) {
                object["cfg"] = JSON.stringify(this.config.toJSON());
            }
            if (this.options.length > 0) {
                var questions = [];
                for (var i = 0; i < this.options.length; i++) {
                    questions.push(this.options[i].toJSON());
                }
                object["opts"] = questions;
            }
            return object;
        };
        KASQuestion.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var question = new KASQuestion();
            if (object.hasOwnProperty("id")) {
                question.id = object["id"];
            }
            if (object.hasOwnProperty("title")) {
                question.title = object["title"];
            }
            if (object.hasOwnProperty("type")) {
                question.type = object["type"];
            }
            if (object.hasOwnProperty("invis")) {
                question.isInvisible = object["invis"];
            }
            if (object.hasOwnProperty("editable")) {
                question.isEditable = object["editable"];
            }
            if (object.hasOwnProperty("er")) {
                question.isExcludedFromReporting = object["er"];
            }
            if (object.hasOwnProperty("dt")) {
                question.displayType = object["dt"];
            }
            if (object.hasOwnProperty("cfg")) {
                var config = JSON.parse(object["cfg"]);
                switch (question.type) {
                    case KASClient.KASQuestionType.Image:
                        question.config = KASClient.KASImageQuestionConfig.fromJSON(config);
                        break;
                    default:
                        question.config = KASClient.KASQuestionConfig.fromJSON(config);
                        break;
                }
            }
            else {
                switch (question.type) {
                    case KASClient.KASQuestionType.Image:
                        question.config = new KASClient.KASImageQuestionConfig();
                        break;
                    default:
                        question.config = new KASClient.KASQuestionConfig();
                        break;
                }
            }
            if (object.hasOwnProperty("opts")) {
                var options = object["opts"];
                for (var i = 0; i < options.length; i++) {
                    question.options.push(KASClient.KASQuestionOption.fromJSON(options[i]));
                }
            }
            return question;
        };
        return KASQuestion;
    }());
    KASClient.KASQuestion = KASQuestion;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASQuestionDisplayType;
    (function (KASQuestionDisplayType) {
        // Default type
        KASQuestionDisplayType[KASQuestionDisplayType["None"] = -1] = "None";
        // Options are to be shown in drop-down display style
        KASQuestionDisplayType[KASQuestionDisplayType["DropDown"] = 0] = "DropDown";
        // Multiple options can be selected from the list of options
        KASQuestionDisplayType[KASQuestionDisplayType["RadioButton"] = 1] = "RadioButton";
    })(KASQuestionDisplayType = KASClient.KASQuestionDisplayType || (KASClient.KASQuestionDisplayType = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASQuestionOption = (function () {
        function KASQuestionOption() {
            // Index of the option, starts with 0
            this.id = 0;
            // Title of the option
            this.text = "";
            // Additional image url (optional)
            this.pictureUrl = null;
        }
        KASQuestionOption.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var questionOption = new KASQuestionOption();
            if (object.hasOwnProperty("id")) {
                questionOption.id = object["id"];
            }
            if (object.hasOwnProperty("at")) {
                questionOption.text = object["at"];
            }
            if (object.hasOwnProperty("ap")) {
                questionOption.pictureUrl = object["ap"];
            }
            return questionOption;
        };
        KASQuestionOption.prototype.toJSON = function () {
            var object = JSON.parse("{}");
            object["id"] = this.id;
            object["at"] = this.text;
            if (this.pictureUrl) {
                object["ap"] = this.pictureUrl;
            }
            return object;
        };
        return KASQuestionOption;
    }());
    KASClient.KASQuestionOption = KASQuestionOption;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASQuestionType;
    (function (KASQuestionType) {
        // Default type
        KASQuestionType[KASQuestionType["None"] = -1] = "None";
        // Only one option can be selected from the list of options
        KASQuestionType[KASQuestionType["SingleSelect"] = 0] = "SingleSelect";
        // Multiple options can be selected from the list of options
        KASQuestionType[KASQuestionType["MultiSelect"] = 1] = "MultiSelect";
        // Any text can be the answer to the question
        KASQuestionType[KASQuestionType["Text"] = 2] = "Text";
        // Only numbers can be a valid answer to the question
        KASQuestionType[KASQuestionType["Numeric"] = 3] = "Numeric";
        // User's current location will be attached as the answer
        KASQuestionType[KASQuestionType["Location"] = 4] = "Location";
        // Date time type answer
        KASQuestionType[KASQuestionType["DateTime"] = 5] = "DateTime";
        // Answer will be an image attachment
        KASQuestionType[KASQuestionType["Image"] = 6] = "Image";
        // Single select type, but each question's options are dependent upon the choice of the previous one
        KASQuestionType[KASQuestionType["SingleSelectExternal"] = 7] = "SingleSelectExternal";
        // Attachment List type answer
        KASQuestionType[KASQuestionType["AttachmentList"] = 8] = "AttachmentList";
    })(KASQuestionType = KASClient.KASQuestionType || (KASClient.KASQuestionType = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var KASUser = (function () {
        function KASUser() {
            // Unique user id
            this.id = "";
            // Name of the user ("You" for the current user)
            this.name = "";
            // Not considering "You"
            this.originalName = "";
            // Profile picture url of the user
            this.pictureUrl = "";
            // Phone number of the user
            this.phoneNumber = "";
            // In case the PictureUrl is not there, we should use the users initials as the profile pic, below two members are for that
            this.pictureBGColor = "";
            this.pictureInitials = "";
        }
        KASUser.fromJSON = function (object) {
            if (object == null) {
                return null;
            }
            var user = new KASUser();
            var idField = null;
            if (object.hasOwnProperty("id")) {
                idField = object["id"];
            }
            else if (object.hasOwnProperty("uId")) {
                idField = object["uId"];
            }
            if (idField) {
                if (idField.lastIndexOf("USR_", 0) == 0) {
                    user.id = idField.substring(4); // Ignoring USR_
                }
                else {
                    user.id = idField;
                }
            }
            if (object.hasOwnProperty("name")) {
                user.name = object["name"];
            }
            if (object.hasOwnProperty("originalName")) {
                user.originalName = object["originalName"];
            }
            if (object.hasOwnProperty("pictureUrl")) {
                user.pictureUrl = object["pictureUrl"];
            }
            if (object.hasOwnProperty("phoneNumber")) {
                user.phoneNumber = object["phoneNumber"];
            }
            if (object.hasOwnProperty("pictureBGColor")) {
                user.pictureBGColor = object["pictureBGColor"];
            }
            if (object.hasOwnProperty("pictureInitials")) {
                user.pictureInitials = object["pictureInitials"];
            }
            return user;
        };
        return KASUser;
    }());
    KASClient.KASUser = KASUser;
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var Assets = (function () {
            function Assets() {
            }
            Assets.navigationBackiOS = "iVBORw0KGgoAAAANSUhEUgAAACcAAAA/BAMAAACRCMzwAAAAAXNSR0IArs4c6QAAABJQTFRFAAAAAKf/AKP/AKL/AKL/AKH/S2WhQAAAAAV0Uk5TACBAwOB5MxF5AAAAU0lEQVQ4y2NgQAXCAgwYgNHVEVNQJDREAFNhaKgjpsJQDKUghRhKQQrRBSEK0bSPKhyWChlMwYIKhFMFdjNHlY5ApY5ElDbYyyWsJRj2sg5SKgIAZD9xjxU9CiMAAAAASUVORK5CYII=";
            Assets.navigationBackAndroid = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAAXNSR0IArs4c6QAAABJQTFRFAAAAALP/AKb/AKH/AKH/AKH/jAPDRgAAAAV0Uk5TAAoUgNF8rpdwAAAAU0lEQVQ4y2NgQABmAwbswDQYuzhzaCh2LaahocE4NISGCGDXEOqES4PCqAZ6asACwBqwSpiSLIHTKJyW43YuTg+OaqGbFgFSCgDcRQbOQga1WAIAxPhlI6IvlcwAAAAASUVORK5CYII=";
            Assets.like = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAbZQTFRFAAAA////gID/qqqqgIC/mZmZgICqkpKSgICfcY6qgICZdIuidomdgICScICPeIeWcYCceYaUc4CZeYaSdICXdYCVcIWZdoCTdoCSd4CRcICPb4OQc4CScYKUcoKScoKScICUc4KRcoCScIKPcIKTcYKScoGRc4GQb4GQcIGPcoCRcYGScYGRcICPcICPcICScYCRb36QcH6PcX6RcICPcICRb36QcYCRb36QcYCRcYCQcX6RcICPcX6QcX6QcICRb36QcICRb36QcYCRcH6PcH6PcH6RcH6RcX+Qb3+QcICRb3+QcYCQcYCQb4CQcH+RcH+QcICPcX+QcICPcICPcICRb3+QcH+PcYCQcH+PcH+Rb4CQcICPcICPb3+QcICQb36QcH+Pb36Qb36QcH+QcH6Pb3+Qb3+QcH+Pb36QcH+QcH6Pb3+QcH6Qb3+QcH+Pb36QcH+Pb36Qb3+Qb3+QcH6Pb3+QcH6QcH+Pb36QcH+Pb36QcH+Qb3+QcH6Pb3+Qb36QcH+Pb36Qb36Qb36QcH+Qb3+QcH6Pb3+QcH6PcH6Pb36Qb36QcH+Pb36QcH+Pb36Qb36PM0LYtQAAAJF0Uk5TAAECAwQFBgcICQoLDQ4QERITFBUWGBkaHB4gJyorLzEyMzg5Oz9BRUdJSk1PUFJUVldZYWJkZWZnaGxvcHFzdHV2d3h5e31/g4WGh4iKjI2PkJGSlJaXmZqbnZ6gpKWoqqusrrGytbe5vr/AxcbHy8zNztHT1NXY2drb3t/h4uXo6ers7u/x8vP09vj6+/z9/tH8Fq4AAAIESURBVEjHlZX5Q0xRFMdv02ZLWaKIkl2ykyWZkTC2hLJEdokkyhYxVBKl+fzHzrvPzMTcx7nnl/O9957PO3c9zxiHbRvo69y7yOjtPGITyQVq4DHWhpZqgRRceClEf0wXXwnfCmLxn3BIB2yRb4u7CG91QAI6xZWNQ60K6IGDgb8HTSrgFdQHPg4dmvjSGWYXBmIfdGuAOnhnxS64rQH2w10rDsANDdANcSta4ZwG+Ph7zaYLmhXxa+XeFVo1AJsVwGnosSI2Bcv/H1/wARqtqpFU67JWVxR9kcZKMps0195scAP3oT1UN/8EmG50xa+YgdWhvDM412RB09sdQBs8cWaufgbjSwJVvqPJ2u7KoDUMe9xzrRiBFvFrUpk5Tm6yj+171NuXy/tA3MPcqoaMaYCnURsud7FX3Hs5p6uBwawxx+ByFNAOXeJGodq2JYWtSImI+HmfYWsecAmORAArp8IxNWCa5bS9gPk/oMoHMC9g/d9Axz+AQll1jU+GM5Aq9gBOSECrz6KlDvbGfIAknDI+wElIegHX4Gg+EL2t5V9goz5DRULK22iRHmiR0XRYBHSATPXTTuMB9GeqmxJYlSa9zAlE7JK83z4TleF6Wd4/7LiMNWRaw7mqMWnP322PsvjZXKdU+arX7vjni3PF4MpY2Pf1VtBZfHgwnRc+0laSjf8FL0lJtsGF5bIAAAAASUVORK5CYII=";
            Assets.unlike = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAThQTFRFAAAA////gICAQICAM2ZmVVWASUltQGBgM01mO05iQFBgPEtpNlFrM01mPUlhOlFoNUpgM1JmN0lkM01mN0lhNU1lNkxiNEljM01hMktfNkxiNElfNUlhM0tiNEpgMkthNEliNEhgNUlgNEphM0lgNUtgNElhNUlhNUphM0phMklfM0pgNElhM0pgMklgNEhhM0lfM0lhNElfM0hgNElfMkhgM0hfNElgM0pgM0lgNEhgM0lgM0hhNEhgM0lfM0lgMklfMklgMklfM0lgM0lgMklgM0lfMkhfMklgM0lgMkhgM0lfM0hfMkhgM0lgMklfMklfMklfM0lfM0hfMklgM0hgM0lfMkhfM0hfMkhgM0lfM0hgMkhgM0lgM0hfMklfMklgM0lfM0lgM0hgM0hfMklgMkhfMkhfNdytPAAAAGd0Uk5TAAECBAUGBwgKDRARExQVFhgZHB4qKy8xMjM5Oz9BRUdJSk1PUFJUV2FkZmhsb3Bxc3R2eHt/g4WHiIqQkZSWl5mdnqSlqK6xsrW3ub7Fx8vM0dPU1djZ297f4eLl6Ozu7/Hy+vv9/jvPKOUAAAFiSURBVEjHldRnU8JAEAbgFbA3xIZdsWNXFBUVRWyIBRULiiIi+///gUkwlxtySXbfb3fzPnOTm9wCKDJ1mz1aaAV69lFLKd5CBtdoJNdJBcUawBsfrR9EM0s0MCHAMw1sCoCDJJC2QJQEHi2QoPSbKhZIUUDY6uMZBSxK4IQCUhLYo4B3CawS+gNSH8cJYEcG3d79hjepXxoSCfs9f6S65EfU4NwJ4M+Mqt9TQWcxrQAxdMlXh15pn40amQ/qqwc3gOtao998j1gekx+bMhcauLSWOYCIO8ho4BUxfawH8Rdgwx0kNVBA7DU+V1v/TyTnTNrAgTtY4YI8F2CIC4brQcID9DFPKAaYYIv50RkfE2wDE8S5YM0O3K91lHlCwc8D1doQIIOPOeABc8hQQbVLCZxvKQvMEyImkAZRGSDu1L8So27X2kwDhJ7U/bs2AZoPP2t736f6ZmD5vmqrv8QaRf8P/lv8xBH7lW8AAAAASUVORK5CYII=";
            Assets.comment = "iVBORw0KGgoAAAANSUhEUgAAADYAAAAwCAMAAABtwnnyAAAAAXNSR0IArs4c6QAAAdRQTFRFAAAA////gID/qqqqgIC/mZmZgICqkpKSgICfjo6OdIuLgICVdomJgICSd4iIgICPeIeWgICOeYaUc4CMdICLeoWQeoWPdoCJe4SOdoCJd4CIc4SMeICPdYOKeICOdYOKc4CMd4KIdICLdYCKcoKNdYCKdoCJc32MdoCJdH2LdX2KdX2Kc4CMdX2Kdn6JdICLdICLc36JdYCKc36IdYCKdH6IcoCKdH6Lc4CJdH6LdX6Kc4CJcn6KdICIcn6KdICIc36KdYCKcoCKcoCKdH6JdH6Ic32Jcn6KdH2JdH2JdH2Jcn2Ic32Icn6Jc32Kc32KdH6Jc3+Icn6Jc3+Kc36Jc36Jcn+Jc36Icn+Jc36Icn+Jc36Ic3+JdH6Ic3+Jcn6Jc32Ic36Jcn2Ic36Jc36Jc36Jc32Jc32Jcn6Ic32Jc36Icn2Jc36Jcn2Ic36Jc32Ic32Ic36Icn6Jcn6Jcn6Jc36Icn6Jcn6Jc32Ic36Jcn2Ic36Jcn2Jc32Jcn6Ic32Jcn6Ic32Jc32Jc32Jc36Jcn2Ic36Jcn2Ic36Jcn2Ic36Jc32Icn6Jc32Icn6Ic32Jcn6Ic32Jcn6Ic36Icn2Jc36Icn2Jc36Icn2Jc36Icn2Jcn2IHkihwwAAAJt0Uk5TAAECAwQFBgcICQsMDQ4PEBESExQWFxkaGxweHyAjJCUoKywwMTI0NTY5Oz0+P0FCREVGR0pLTE1QUVNUVVZXWFleYGJjZWhrbG5wcnZ7fH6EhYaJioyPkJGSk5SVlpean6ChoqSoq62ur7K3uLm6u7/BwsfJysvNztHS09ba29zd3uDi4+Tl6Onq6+zt7vHy8/T19/j5+vv8/f4n3j/bAAACPUlEQVRIx6WW50PTQBjGz0aByCqjgANEqKNSZwVFEJTKVAsIqDgrG7UiS1EcDEFEEAUq2uef9Q1ovZQklyvvl+Se6y9J752MxVpxc9/kwhosrT2G8XRMQ2xBPeR+CTv2VOGh3OBvTVwK+n1FGczYzm8AIyqvlH0nJvz47G5mbp5V4E06rzRqrxrIZ1Z2eBmYzuEE5R5B709aQiztE/C5gFceEjWSaU2xG8A3Ny/4iepJEFAsCNTz62PrQDcTWhdwlVum0zdPqNJYK/D1AJPFXD+ACiaN3QVeMWksLwz45LFG8hiTx14AfnksJYyISx6rAMaYPEYx3BwHFgIux4FNAd7oRnaV52+UVm+l1d5yn8MQWwIO/bsvojS8rd20ACtH6er8AAw5jDBydjKXGUAWveMXXftIaNKE0zvEBoCqOD5yFCjljqTE5pHMACe42LLrAKoBLnl3H6QKxOSDq4HKeHSR+tNuKD8Hav+vhmwmTvI6IlxFpjQdtoPV6mvHPnL4OTGVOAtc54VOYFyMUcDM62qpi7rPJRGV+gWo00u3gEVBed01CHzco9ecc8DrJEssQCF9MVY8TmHTZUWVUs9s2y5fo4d1mzeqanpsSDHYeETcsFmfD0So9xpuKg+0Juw12srppa23+838orX8/m0tXw1oA8SzFNM/cGFrwDjDDxiFN2e1snBfsTiuvCeR6DjjVPO9V1rfbQ49E6cEoXDEYHiar3GIIy9mVFvprVRtVgz35mC4sTwVulOWaPajP4S0PvuJHhA3AAAAAElFTkSuQmCC";
            Assets.editImage = "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAbtJREFUSA21lU1OAkEQhV8Pmrj25xaCegVw58KdJgr+nMAVLryAMe5dGBMDKIkcwSBnULwCO4GVG6NYvtK0TM8I0zLaSaemuqe+V11T6QH+YogYVOUEFelwlsNIE3YmehYJUMUFY/e/4w2OsWOO1E8vUJVLCPa+4fYhwClK5nDK+hNbg1vGliiScRjvKLNsz+lPoNSabFDgmtNN2KATOKqTOiXTYOgm52sEcRbxPdyKrLBTmmjIbOztiqyzLC/cF9pz3f9dia5lGW+4Y5zC7zlXsWt6tMNRkzWWqogZzg0z8Bdw4RbYxjQK2DJduxC1ft9A4QM0GRwtS44naqEu81Gw9ZMFarL0CRfM2SDHCrIUuXHWQs54AYULaz4K/gV6ojkIMZ3H0d/AB27QRYA8iubRoYacn09Ql1xi5h5w1YkLKFxbcVxZPOEq4JboSrJ4Z1cIRnYFI7q8ELQ12wpIGkMBP3iP8LwvXMW/SuQLN/6Z25Ppn2iRJWlxYcEuxqxBj6Up8H5/iO0lLAT/CVdtvb/HZ57hhbb9+8ztweJtaneAPv9RCtdbc+IxSqD/2Yop4ZrVTwJ9rqfO3B75A7THlDrp4UmvAAAAAElFTkSuQmCC";
            Assets.chevron = "iVBORw0KGgoAAAANSUhEUgAAABgAAAAkCAYAAACTz/ouAAAAAXNSR0IArs4c6QAAAVRJREFUSA21109qwkAUBvAkSnGhiyx6AekNFIorRbxQl93NzqX36B0KWXoIEXqBLoq40sR8wRma+EzmvXkZkJA3me/nnzi8RBExPsz2DS9iil0aNFfcg6dlPV2sNvE++/5tXsM5rwH/wm1GMOIAIlwFSZBijBkOkuGrTSSOU+lvEtswY75eTsnP7JpfJrZGHI8783kg6k9LDsAVfSA1oA/kAdBGSEATeQpoIa2ABtIJhCJeQAjiDUgRFiBB2AAXEQEcpNpNsUAy8vza+QY7L6BgbIp/0XFeRMWYmr/Xqp2XDXDCAbEAbjgLkIR7A9JwLyAkvBMIDW8FNMIBkH80hKPD8LnPEdI2Hm5TG67VvtQA7XB8Mgf0EQ6g6k3ROp6S81zra0GwHRWQZVn+vlyPymJqJxpHdsto17vuGs8BeB4gEHE4EAfghECCwpFJDrTq0na9GXgDuCcssrft97EAAAAASUVORK5CYII=";
            Assets.emptyState = "iVBORw0KGgoAAAANSUhEUgAAAqAAAAH+CAYAAABDULzfAAAAAXNSR0IArs4c6QAAQABJREFUeAHt3Ql4XFXZwPH33JnJ3iRtutCWLrS0FAqVbiyiUARRNkXBIiCtgIDKUkTgE2WpCp+IArKIgii0LEIBgY9FBJGKAspS1paldKGlC23TNnuzzD3fOZPMZGnSTpKZyb13/vM8ce7cufec9/2dGN7e5VwRXggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIBAVgqorMyapBFAAAEEEEiDQNXPfzfDdd0ZtmnHcRb2u/x7C+0yLwQQaC8Qbv+RTwgggAACCCDQUwFbfGotV9r9zbJ9W2j/hxcCCLQXcNp/5BMCCCCAAAIIIIAAAukVoABNry+tI4AAAggggAACCHQQoADtAMJHBBBAAAEEEEAAgfQKUICm15fWEUAAAQQQQAABBDoIUIB2AOEjAggggAACCCCAQHoFKEDT60vrCCCAAAIIIIAAAh0EKEA7gPARAQQQQAABBBBAIL0CFKDp9aV1BBBAAAEEEEAAgQ4CFKAdQPiIAAIIIIAAAgggkF4BCtD0+tI6AggggAACCCCAQAcBCtAOIHxEAAEEEEAAAQQQSK8ABWh6fWkdAQQQQAABBBBAoIMABWgHED4igAACCCCAAAIIpFcgnN7maR0B/wls/OYlwyTaOE5cPUy0GhbLQOm14qi1EoosHXT/tWv9lxURI4AAAggg4B0BClDvjAWR9KHAxhMvHC9R90TR+qu6oX5qayi6edG+Rc3/ROtl4/FzXhelHpOQ88CgB67/sHVblhBAAAEEEEAgGQEK0GSU2CawAuWnXLJrtK7+Z9LkztZaJ3VJitYy1RSqU5V25274+px5ofzcK8ruvfaTwCKRGAIIIIAAAikWSOo/uCnuk+YQ8ITAxuMvuDC6rX6pCea0dsWnUuIU5otTWiyhQf1jP3bZrjNHPhOxt+xzWnRbw4e2rcQXLCCAAAIIIIDADgU4ArpDHr4MooA+76bcjWuW324KyFlt83OKC8XpXyJOUYGY0+ttv2pdjrriVteKu6VC3Mqa5vVa55uT89dt+PoFnxk0fMxZ6ubz61t3YAkBBBBAAAEEOgp08V/ZjpvxGYFgCNjic9Pa5c+ItBafKj9XImNHSHj0cHFKirouPi2BKUztNnZbu4/dt/WlZ9m2bR+t61hCAAEEEEAAgY4CFKAdRfgcaIGWI58Hx5N0ykoksvtIUfb0ejdfdh+7r20j/jJHVQ+2fcQ/844AAggggAAC2wtQgG5vwpqACjRfp9l65DM0dJCEhw9pd11nt1M314TaNmxbrS89i2tCWzVYQgABBBBAoKMABWhHET4HUsDe7W6u07wqnpw9amlvMErVy7bV7kio6cv2mar2aQcBBBBAAIEgCVCABmk0yaVLgdhUS+ZmIbuBKsiT8LDBXW7b0y9sm4lrQk1fsT572hj7IYAAAgggEGABCtAADy6pNQvYSeaVUrPjHmF7urzNdErx9b1+t6fj2xS2ts/YBPe9bpgGEEAAAQQQCJYABWiwxpNsOhMwTziKz/Npp1rqyQ1HnTXb2Trbtu3DvmJ92qcr8UIAAQQQQACBdgIUoO04+BBIAfN4zXhedp7PdL/a9dGm73T3S/sIIIAAAgj4RYAC1C8jRZw9Etj4zUuGxR6dafd2zBOO7CTzaX7F+mg5xW/7tjGkuUuaRwABBBBAwFcCFKC+Gi6C7bZAtHFcfB8nP2/Hk8zHN+ztu52s3tzolHi1iSGxjgUEEEAAAQSyWIACNIsHPytSd3Xr0cdIJHMpt+2rbQyZi4CeEEAAAQQQ8KwABahnh4bAUiKgVaIAVZFQSppMppF2fbWJIZl92QYBBBBAAIGgC1CABn2Eya/vBZS5EpQXAggggAACCCQEKEATFCwEUkDptfG8dGM0vpj29w59rUt7h3SAAAIIIICAjwQoQH00WITaAwFHJQpQaWzsQQM93KVtX21j6GFz7IYAAggggECQBMJBSoZcENhOIBRZKtH62Gq3dptI1E3/nfCmj1hf8WBsDLwQQCArBIoP3usqeWPjL2PJTh6UwX/1ZgUvSQZIQAUoF1JBoFOBjcfPeS0+F2h41DBxSoo63S5VK92Kamn6uPnAq5kO9PVBD984LVVt0w4CCCCAAAJBEOAUfBBGkRx2LKDUY/EN3C0V8cW0vbfro03faeuQhhFAAAEEEPCZAAWozwaMcHsgEHIeUEqZc+8ibmWN6Jq6HjSS3C62bduHfcX6NH0ntydbIYAAAgggkD0CFKDZM9ZZm+mgB67/UGs9Lw7QtHaDSDpmRjJtxtpu6cj2afuO98s7AggggAACCDQLUIDym5AVAqH83CvMIcnYoU9dV9+uUEwVgC0+bduxl+kr1meqGqcdBBBAAAEEAiRAARqgwSSVrgXK7r32E3PH3WXxLdzyColu3BL/2Ot325ZtM/6yfdk+4595RwABBBBAAIFWAe6Cb7VgKQsENnz9AnMqXs+Kp+qUlUh42GB7wWZ8VffeW067ty0+TWPzB//lN7O71xBbI4AAAgggkD0CHAHNnrEmUyMwaPiYs8zNQS/EMWzh2LhsdY9uTLI3HDV+tKr9kU/Ttu0j3j7vCCCAAAIIILC9QA8P+2zfEGsQ8IuAPu+m3I1rlt/e9kiojd0pLhSnf4k4RQVdT1ZvJ5mvrhU71VL8bvfWvNX8WIF78/ktF4K2fsMSAggggAACCLQKUIC2WrCUZQIbj7/gQi1ylbkjPr9d6uZ0vFOQJxKJiIqEYl/Fnu1uHq8Ze8JRxzvozQ1H5v9Ilw16+DfXt2uHDwgggAACCCDQqQAFaKcsrMwWgfJTLtk1Wlf/M3NafraZNqlbl6TYeT7tVEv2bnduOMqW3xjyRAABBBBIhQAFaCoUacP3AhtPvHC8eU78ieZo6FfNAc6pO0rIPl7T3LT0mJhJ5pnnc0dSfIcAAggggEDnAhSgnbuwNosFNn7zkmESbRwnrh4mWg2LUSi9Vhy1VkKRpYPuv7b5Qe9ZbETqCCCAgO8F7tbnijaXYWXuVSGz1KjMdeftnsLeDo/oEMi8QEuBSZGZeXp6RAABBDInoCXXFKAlGeuQQ37tqLt1zVu7PfmAAAIIIIAAAggggEAPBDgC2gM0dkEAAQQQQAABHwqccdt3ElEv/fd+Ujgw8TEtC6VDRfIzd5A1LTmkqVEK0DTB0iwCCCCAAAIIeE3A/UMiorXvJhbTtjBuBgVoF7icgu8ChtUIIIAAAggggAAC6RHgCGh6XGkVAQQQQAABBLwsULzLf6Ww//4pD3HrOpG6rSlvNmgNUoAGbUTJBwEEEEAAAQR2LjD5uAfNXfCpL0CX/pMCdOf6win4JJDYBAEEEEAAAQQQQCB1AhSgqbOkJQQQQAABBBBAAIEkBChAk0BiEwQQQAABBBBAAIHUCVCAps6SlhBAAAEEEEAAAQSSEKAATQKJTRBAAAEEEEAAAQRSJ0ABmjpLWkIAAQQQQAABBBBIQoACNAkkNkEAAQQQQAABBBBInQAFaOosaQkBBBBAAAEEEEAgCQEK0CSQ2AQBBBBAAAEEEEAgdQIUoKmzpCUEEEAAAQQQQACBJAQoQJNAYhMEEEAAAQQQQACB1AlQgKbOkpYQQAABBBBAAAEEkhCgAE0CiU0QQAABBBBAAAEEUidAAZo6S1pCAAEEEEAAAQQQSEKAAjQJJDZBAAEEEEAAAQQQSJ0ABWjqLGkJAQQQQAABBBBAIAkBCtAkkNgEAQQQQAABBBBAIHUCFKCps6QlBBBAAAEEEEAAgSQEKECTQGITBBBAAAEEEEAAgdQJUICmzpKWEEAAAQQQQAABBJIQCCexDZsggAACCCCAAALBEgjJQonKRSlPqmbLN0yb+8fardm0QJS8EltWUp/yvnzcoPJx7ISOAAIIIIAAAggkL3DG73TyG6diS+dM+ePZd6SipaC1wSn4oI0o+SCAAAIIIIAAAh4XoAD1+AARHgIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAII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";
            Assets.cancel = "iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAAXNSR0IArs4c6QAAAY1JREFUWAndmd2SwiAMhTvO7AP6lnqzD7g33RNs3FgB8wfaZQahkOR8BrRMuyyirOt6Rr2gfonhqV3S3hjOVWFMEuQPKpVv1OmwpLlpoyksj7AYlJBkRGUqLPQkZAHAByXuBkudbQDNU5kCC9UaJMPcYHF15ZFGOxQWmj1IRrosSsMhsGZts0P152gbdGu6HW18xTqsFQ6ggE7TSAtUgU6PnR4Q0CNi5uwjkdFhkKyRIZARg3m6bUQo4tuFak16BD0+LX3TuEXYYmuC0BobAOiW2ytDbskP3wPqmkPEeyGZOAA7PpMMya0Ddj6kAzYMeWLRf9seYukdkHApJbwF1CsPuc//e1JCUtao9sq4zEJVk8kCYLFVL6XG0CPs8dGwNG0ighHfJlBtIkMoI0aN7T6WKZAZ6w5InRGB02OmBxQpSIudFkjA7bthjXCAPVHn2q3lduzAvJoya5odXhEY5k3aMD7Mg9xjPBqnlUJWa7DjTjiV7dHYBn8vG9hnBzsVUjDIE9ozpDCkzH7kC7Ff3A9D7M5G9BsAAAAASUVORK5CYII=";
            Assets.dropDownTick = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABPBJREFUaAXVWltoHFUY/ibbSzYaYYtFrVpbTLVCX6xKFTVNtKn6oDUopdLog6UICgo+CL4FBB8qxAcRQRBBW8EomiI0mqBtY1rRFqogEjFQW2hrqzViarrVxvH79uy6M7Ozc9udzeaHszNzLv/5/vNfzm0t1IMG7SwuoAc2usluNVMHU46pnUk0zTTFNMk0AQt7sRij2Gyd53dNZCVuvcvOYRab2H4TgW/ksy0mrxkKMsI2u5Fh2mpJwNgUX4BP7DaO5fME/QJ7K41w7I49DaYpzA7qbAAPWjOessDP6AIM2hmayTYC72e6KpBr0kILpyhIP83rLZrXbBQ20QQYtK9GHkMEfmsUpjXXsXAYrXiYQpwI4xUuwDv2OjL5OLVRr4ZQ2gB68YT1dbUqym8JKsROu4/A9zUcvEDJTNW3MARQdQ2o4SzeDWjbuKIMHkeftdOvQ38BZDaSHrTE5qA8nbvLz5wqBTAOe2hOzCZosOQTrbjN69huH1CoNNEmnTAZBDCsTD4hbMLoILcAJs43JlQ6QER+VRgXRgeVTcjMsJNNZzoOsIVXmVKOa63ijF3WgFkeNJ/peAWQKQlrkYwGtDC7iGPMq9fapsQ/rec0FuA6LQCNBsyqcr6A16C0F1fC/8/EWhY3nBZx+LasSNxtAbPFsJTFefxGNnHX84l7VsNLFgAfdQEblwGvTwDPfgP8G4/jDLK4vKWwk2ow+CWLgM97DHhhfoZ7uF13AwvLMTGKKG3C3sKw2R2ldr3qXEM9j98PrFvq5rhlJbVwkzsv9IvYqcjCHja0bj0q3HgZMLIBWH5pJbc3fgRe/aEyPyRntaJQR0iluhTfsgT4kiPvB/6l74CnueqP6QPC1SEN6PQgVbrnSmCIhtq+0N2NbQPPHQJeoxMnpJw0kCj+5+iI73cCN9AsguiR5cCeeyvB/8Ph7huvCby6bTcTWRACn7JlWWDsPmDzCuOQa2kefrR9lRFysWv9CMxc5FnMF8B7R/1axcuTADp0ikyrqK8DDwBrioa3lFuefRSm+wo3ixfXAG/eAWQ8QzR1AdgwCgyfdNdP+DUt9rEOlG7maCsUOkm2Pczo0nstuHECBrggf3mts4Z5P8kTn87PgK9+rSxLmDMlJ9ZxX0dUBoPHgHM0gQ/XA1m1LpLM5APmjZ8B1tNpvfTTn5y4OPI//+Utqel7UhqIHQP2nAB6COaPv92dy1z8wB85C9z1ad3Bq/OJFup8rxtGtK8DNINOgjoVchC4/xegiyegZ/LR+MaqRew1L+ZWclYd7QGu9wnGQ8eBx8aAPENmClRczOmI25wSJ+rj6DngzmHg29/dzd+mZz26PzXwihYjOp6XD4h2m0ey39M0jy5Gl7HTpv0r3wNPHgRm7WT8IrYqYFbU41q2PlvKVg7HQwylilQpk2dLqcsFnc/XSLL1BoCX+ewoXYiUTEhLugEW6ES4uckcqwyUQJYF0DmLhf5SQdM+hdFxi1MWQIh1M6LLhWYlYRNGBxkndmRwk6/bmHl6uCtBzLVOL9/SmDudQxXnXVh6vSfTYuA2oRJLXetksL30OedPYaly1eQvgBDrRkQ3I3OriXwBQ5XbGcGs9AHlOqnJL/nCBZAwTXzNWt2EnFqQY7fidnrMU6lOdpqk1If6inBHLIjRNOAUZt7+1cAphN7n7Z89vILoew7/bvMfy2FbsoAtOD4AAAAASUVORK5CYII=";
            Assets.excelIcon = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJrSURBVGhD7Zi/S1tRGIbzP/gHqDg7OnVwFHHrkklwKm1X7eQkiFOrdKiSoVRoq4MgJYvE5YIgggRKKYUOQoYSsEMpsVDIdHrf6/ns5/VLPm/OObm5eB94MOa7uXnf+yMnpFIy6kyNTzwJ6FLsmH2rMOCNTCBeb259D14iZIH9j3vmqtP5GbRE6AIgaIlhFADBSqQL1Gq1vmbZ5vnTZ8ljIkiJYRYA3ksMuwDwWiKPAsBbibwKAC8l0gV8gk8hTVrsbJzsDHIGPnw+MhvRbk+B9DyXgww2TnZ6FajX6yaKItNsNk2r1TLtdttucY0UitTmkOO1QLfbTf6eXXwxja+nZqvx3izvvzTV7RdmevWxmVieS+ZSKFKbQ87ABeIws5MLM2+kkP0EUihSm0POvQvEb/4uNor9TWEGEUihSG0OOVkKiIGy6ptcCkhHldTmkFMWyCqQQpHaHHIeboH5V/+/qxycH988j8fEo/XFW6+BQApFanPIcToDWLAIhMU6QPBSXN84Fahur9jdmGTVhaDz90/PRQ1IR5XU5pDjfA/QWfjx6zIJDlBE2hYCKRSpzSHHuQA/C6Df0YdACkVqc8hxLgC/tS/s7npf+ySQQpHaHHKcC/BPI1C4M8DvAUK7B3ziVIBf//hKTWtAYT6F6NrH0cf//HJ6e3J4Z3sIpFCkNoecgQvgiBNrn3Zunk8vbvw1EEihSG0OOc73QFqExqUFpcsISKFIbQ453gtoAikUqc0hJ5cCPinPQFaBFIrU5pCTpUCxf5VIE4cp1u9CEnix3U9CoX6ZA+kCeVAWsPvJDecCo6CNUzJiVCr/AJGHWH/5xCpHAAAAAElFTkSuQmCC";
            Assets.pdfIcon = "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";
            Assets.pptIcon = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJiSURBVGhD7ZhPSxtBGMbzHfwALbTQL+C9R48Fzy30JNgeemmxB7G99BZaihEhQWoVNaftXQ+eSukt/UNjqYkoC2kLRaOoBAuv+6wz7bi+2d1Z3zF72B88h2Qn2ee3md2dbKkg79y4dn3MYe4HGVK7cgN2RI54/fLVhnMJlwIrS8u03+3+cirhWgA4lbgKAeBMQlLgcHUuzPGHd3Sy/ZWWFxfUljOcSLgQ0FmYeqS2/Edcwlag1+tRo9Gger1OlUoljCYq8HbyodpyHlEJG4F2u021Wu1f8awCQEwirUCz2bxQXEdjIwBEJNII4MhzxXU0nICZpelyeGUyo292qo49SQKY8+a0qVar5HleKoFocHXiQAdVx54kgU6nQ61Wi3zfV++ckUUA4XAicPDpI+29X6PO4jRtl5/Sjyf36PPoMDVGboXbcyEQlLn9bPjmDFcyLoATyEpqgWDnb4KsB9nVZbIEDEqALWQbYAqkSRyFgG0AV7JfsOyII/cCWDvFkWsB3ARxM4zj0gJRej99+u3Ns2MRwJXlgmVIEuICmn4SgCsbDRaAaRAT8Gdf0NbzB+EvAP4edPuO5wrrYNqkOfIaMYHNx3fD17gza6JjEWD+odHBezhhk+Z8FHEBrIFA3C8giZjA0ea3MJo/q17seCmcnMRYjX7ps7CTRkwAR3ynPEHfx++w43QAt1S2iYn4OZAUwJWyiclABCQpBGwDuGlhE5NCwDbSFAK2Ady0sImJjYDYUwmulE1MUgtECcpkfi4kSWYBgA+r7zlH0pM5SZwIXCWFgPqegXFpgTxE1SnIGaXSKZBJ6C438mAmAAAAAElFTkSuQmCC";
            Assets.wordIcon = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJOSURBVGhD7Zi/SgNBEIfzDj6AgoWFD6CNWPkCNpYmjfgHW4t0VhaCYpFAbAyCWohYiIUgJJVFsJOgVjYqKIIk2Fit90t24uRYTWadTQLeB78im+zdfHuzd+FSCYPO6PDIQsCkowzZU4UBJzKB2NnavgsuEVLg6ODQ1Gu1l6ASoQVAUIleCIBgEr0SAEEkeikA1CXiAoVCQS3Li0v2qO2oSvRDAKhJxAU0cbUQR0UitECn0MPOliMnpEC3oAZbjhxfAVfPS8IJIlCpPpnLyoPJHV+bbL5k0utnZjJTNONzu43vXUVJwvEWiIqZHpvK5FxF/hZtuhaITr4XpRTlnYrxiTYSAWdB0mjTFwFXX0vCSQSk0eb/CWTzZTvVmPno1knj9Y/Pxlil+twawy0WPL7WW2PaiAVmVr7/ZEEGY7NrJ3akCf0WMuC0fN8aA66+loTj1UK02vvnN43P/KoACGEcKw82iletucBVlCQcLwH8TQDULlhhDgqeiJ7KBAkh2ngJUG/jSuAzrTRvGewPgs/VxkuAF0f9DxlqpduHt8ZVAHxTI9p4CfBCsA8ACuUbnMZxteLzXH0tCcdbAKvMoUJpgxP8VosAV1GScLwFaIUJKpT2AYHNzOdp4y2wunlhD9GExmmDA1wlPgfRxluA9zsvlG9w/gCjaOMt8FPQMpBAIBn/Hrj6WhKOukCnAFdRknD6IqBJIiCNNhIBtbcSrr6WhNO1QJyoGO/3Qq6iJOF4CwBMtsdpo9ObOU2CCPSSRMAep2/8WWAQYstJGDBSqS89Hvofttp6MwAAAABJRU5ErkJggg==";
            Assets.documentIcon = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADOSURBVGhD7dLBCQMxDERRN5TU6JMbci1uJCkgQWBBEDoskkcLYR7o6t2P1IjAeu8fwDz283jywZPkvTHGuywCEbDWkohXSQQiQJRFoAJESQQyQMAj0AECGlERIH4invvTZ1QFCEhEZYA4HuF9cM55eSx57+rsX8iRh+7AAPWXAd6tZ8fiBhQDgqAB3g1nx+IGFAOCoAHeDWfH4gYUA4KgAd4NZ8fiBhQDgqAB3g1nx+IGFAOCoAHeDWfH4gYUA4IYoBgQdDTgrtm/QITT2heochvXFQEVrQAAAABJRU5ErkJggg==";
            Assets.crossButtonBlack = "iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAMAAAANxBKoAAAAeFBMVEUAAAAAAAAAAAD09PR5eXkAAABKSkoODg79/f3V1dUAAADCwsIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQ0NC8vLwAAAAAAAAAAAAAAAAAAABhYWFCQkLw8PDb29unp6cyMjL5+fnn5+evr68jIyP///95Va5FAAAAJ3RSTlOAAAX0p3eVg/zaV84dDEdkPjIQJBd618ptUU83Kp2S8d+9jvjpwonujrEgAAABeklEQVRIx63V6XKCMBSG4WNstKZJgIDK5tqF+7/DBgn5hAZoZ/r+Y3xGzoThQKu/9B9aZak07BeapTqnLi4SNatNuadBUTqplYaFl2Fdww4qWEDHNFWkxpoJmo7LkQYOcgONMSbL2ZOuaSkBrfZT6Ou0pa7Ka02u++5y3BJ6eW/WZzc6c9pQ36Fpmt0W+NVeH91F7HRJfR9Nx4GhOXtohqlvjePA6zu5kodOCb05DrzBsTy0pgAH9nHW6pwCHBjJVhMCbzxGidWKQhwYxVZnFOLASBOOBL10+rqlYcJqSQjnjHNHpdUmgMHHk7AQXh8CvLJ6xQN4g8eE6laLEKYAV61OcL3x2PMDXv1VqxX0zWPwk384VtsiDNJjcOis0yn5Pi/XM6Hj0ySify8jmuqMG2W9lrRcgX1SLGJuoFm0pOXzZlN8HifDrSlnuR7vb5Mv/DM0Nnh4e0OjKjhNYSa+aSz+4UU2871kieCgUQwLPYjJJNai1FWtxj99A9QhJkgUTQV3AAAAAElFTkSuQmCC";
            Assets.tapToDownload = "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";
            Assets.retry = "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";
            Assets.audioPlay = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAATlBMVEUAAAAAof8Aov8Ao/8Ar/8Aov8Aov8Aov8Aov8Aov8Aov8Aov8Ao/8Ao/8Aov8Aqv8Apf8Aof////+q3/8+uP/j9P+/5/9qyP+O1f8cq/+oiUAQAAAAEXRSTlMA9eZeCezby7evj3xmTjcbEUzq1cEAAAEPSURBVEjHlZZbjsMgDEVtXgFS0jgzncf+N1qpqkqLicHn+x4lgLEBhis5Bo/oQ8zFwYDdJqQ3MNldiLsViYHr6WcuhrqYC/S4LnTKcgXGZkjAbNBgkUTQNnka8mFsOBZwe1uvoQlMXflCUyyv/adJnufhzKxg3ENYaZr1UW/NDv0LAu6dI/j6+ZYPI7XCcZwrCcAhF84VdFCIC4JSIHcEQckQO4KgRAgdQVACeEngigccCMftw8CRcPtt9lX6pRqveGnRNV4JvW2tcU7sHVyNc3KvNGqcUzrFJ8QJHS/vvxrnJH6BZCy7ojK4a5uAus1oG5m2VaqbsbbdaweKfmTph6J+7OoHu/7poH+cqJ8/d8Q2dr8BWOcuAAAAAElFTkSuQmCC";
            Assets.leftArrowAlbum = "iVBORw0KGgoAAAANSUhEUgAAAF0AAACoCAMAAAC18BJbAAAAflBMVEUAAAAAAAAAAAAiIiIAAAC+vr4AAAAAAAAMDAwAAAAAAAAYGBgAAADm5uYAAAAAAAAAAAAAAAAAAAAAAADk5OQAAAAAAAAAAADa2toAAAAAAADKysoAAADi4uLe3t7z8/PW1tbS0tLFxcXOzs7CwsKxsbGKioru7u6ZmZn///9O5EpjAAAAKXRSTlOAAHeJb8sHRYJlDoY+6E9VITRqKuZbFwveXhrTOeTh9NvYz9bNw6/vtuRNAs8AAAJ4SURBVGje1dtPc9MwEAXwJ6FKsSpsyyJ2HQwppSnk+39BOAB7aGij2m+m+44+/A47mrH+7CK03b4ZnAWsG5p914bcR7NRcDG26VKJDF3i2hIZumRoiyfoEtv2DF1iw8jQJU32RB2wyVN0KdDE0CUhUnTxPVOHK0wd2EemDiSqDndg6kCm6thPFTqjOliVhaqjo+qYPVNHMzF1uMjUYUemDtszddiRqcNGpg43MXU0nqljpupoqToyVceBqjvP1NFRdWSqjpGqD1QdC1W3kamjo+roqbqj6khU3U5MHYmqW8/Ukai69Uwdmapbqo5C1Weqjlirf3g4/vhZtygr8I/n33mq+klV4ue7qs1NBV6nB9Gvxs9PVUu+Er+p+0cxcFk1NByN6NvjgDeGgUvhGbisSQYuhWfgUngGLoUn4siGiCOYl/BP63DsDRGHM0QcMEwcIxNHYeJYmDgCE0fLxNEycXTPvtz+xR+xOjOe5eaP/uV2td6AyQ+4kMeteAcm78DkB1zOwyZ8g1f4r2v4GUy+A5Nv8f98Xs0HMPkAJr/gKv7ubXwBkx/B5A1eye4fv9twtyT8d+Hrd3pEPhhU8PeVfDYg8r3BVfy3N/HegMHLqaySP9WdKCv547anYeFrdV+hY3cvldnuFkL40/F42tXdoNDSM3VrmHqg6gemPhimnt7XLfP7uSEvel8mst4XoaT3JS7pfQFNel+ee7Uv/jaq7bQY9Ha4ZLWdRc6r7ejKajvpZrUdjG7S2jlqR60du3bU2indTFo71DutkwHuoHUiY9E6CZOUTiC5onTyK0SVE3c2eY2TjjaMCidMh7Z4XZO9W00lcyeqfwHtlV0Td5FCKAAAAABJRU5ErkJggg==";
            Assets.rightArrowAlbum = "iVBORw0KGgoAAAANSUhEUgAAAF0AAACoCAMAAAC18BJbAAAAeFBMVEUAAAAAAAAAAAAAAAAAAAAiIiK+vr4AAAAQEBAAAAAAAAAAAAAAAAAAAAAAAADm5uYAAAAAAAAAAAAAAAAAAAAAAADY2NjOzs4bGxvm5uYAAAAAAADDw8Pk5OTg4ODc3NzT09MAAADy8vLHx8exsbGPj4/29vb///8OoutaAAAAJ3RSTlOAAHN9EInLQ4QKY09JLiLnVnluGGld3dWG6DkHzubj4Nkn89HDsvYAZ7aHAAACyUlEQVRo3tXb23LaMBSF4b9bSoyPNWDSFJI2UNq8/xu2F8loih0QQWvG2g/wXXhsg7XX4kui8d22qftNNdjSObOh2vR1QQK3LfrBMTHGrXJtQUupl229AlDo+94BEn3dGCDRy+0K0OhlsQSR7hsHIt3XDkR62QAqvTVk+roClb4rHDK9M5DpBch0X6HTO0OnFyDTdxt0elmh0/0Knb42dHq3RKfvHTq9c+j09RKd7g2dXq7Q6bsKob5BqBcI9Q6h7k2pVwj1AqHeIdR3ptQLhPraKfUKod4i1EtT6g1C3aPUa6XunVJvQKeXDnR6Acj0cgnI9C2ATF8BqPQ1kjGuux1/H/483V2rWyz++m++312n74mch9fAR+t9vB74WL10RF+ZwMfqLdFzH/hYvSY9H/QVyfmge0jOB73lc/zXuxi9Jj0fdCM5H3QPyfmgt6Tng16Qng96T3o+6APp+aA7ZLzhQcYbHTre2KLjjQYdb9ToeKMnDf88wRsbdLxRoeONgZvn6Z1/HOl2M/74/KbfM9KXOhzD3Yr/CHhqPeBPTOlLHY5hOhxj0OEYlQBP8SZY/HzDf/Gh3utwjFqHYzQ6HGN7G/6Ns3qnwzH8Z/CHS3j4tyTAgz4I8KD3AjzohQAPeivAg+5F+PVfZYuXN/wFgMRflMd3fAGQ+mv4EPBY3V+jBzz9KcQx4IITlMXxcDguuEpvEY0hOmEen7qJ9D2aGZ92ik9qcztl/v+Byux0/2QzkdVW5fR5zWqbNdrE5bRFHP9EZbS9HW+eM9qajzb+WaUVxu+DjFIio4RLTumcs/fN7FNRUZd+rmm0mCTdfFOAlxOMM05fXkyOzjr1eiGxO/O08dmk9OxT3mcS6hmk6z98peXRaphuZOTSJpm8Ovm0eKYaSBm1pyaaXzm11saNu7zagqdNx9xamqcN0/zasVHN3lm3ki80qv8CjPJbs/3U474AAAAASUVORK5CYII=";
            Assets.tapToDownloadDark = "iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAABmmnOVAAAAV1BMVEUAAAAAo/8Ao/8Auf8Ao/8Aof8Aov8Aov8Apv8Aov8Ao/8Apf8Aov8Aof8Aov8Aov8Aov8Aov8Aov8Aov8Aov8Aov8ApP8Aov8Aov8Aof8ApP8Aov8Aof/O4IyYAAAAHHRSTlMATlUGevXZxhPvPByK5c3Ar21gKXioSNa6gEOWmOVToAAAAwFJREFUeNrs1lmygyAQhWGUYjI44pyz/3Xe96BGFNr7kH8FX3W3FuzXr1/R00Vnm7qSpYAoZVU3tis0o4sXS22wlamXgrP0uX4WOErMvWMp063CmVSbbDNjg/M1I4sfzyuEVeU8MqGbEN7UxWSsEteSayzCa8D1hleUTbQCdxItvz8Ghbupu8PIDO5nslursIiTvb4SrRArpa+eg0S85LXDcCViVjoWXmEQN1OEGwRiJ0IVziB+xoXdZIkUlSHXqSXSJPVpA1dIleJnERbpsicNGVKWnTtKg5SZ17WDoD+LFqlrvy9DIHXi60IGpG9gx60IzY4Woa3HVykR2Jsx9kZg8vA2O4SWM8ZyhNYdDWJCaNmlv9t0MIocRAjk+4iKDFHtGkaQITDuIRpCRLNj0CBEQG8jWlJEu41QpAi1aXAgRcBtIXpiRL+FmIkRM/PjghghuI8oQIxA4SMWcsTiI2pyRO0jDDnCeAYNcgS0d5f0CP8yO3qE/8izDyCs/5agRzTeF0qP8L/Rih7hPzTlAwj5iSgfQJSfCPEAQnwi8AAC/3ISf8zaywqDMBCFYUjSRqW1IqEXnPd/zlI3ZzFQhp8sIrgMfAtNMmdmiG/iGlhz1DCiHnfwd6yhNLYEESWUCq9ux4zt9C2EaO40iu2YWzBpKgFEC6ZfGzhFkxR/ESWaddzAfUIKh0AG28HNSgqHQAZbwB1TCodwBpgOzEAhBDHMoO5wCiGQwR68ApNCCGSwD69FpRACGWzhVbkUQiDDJfN8QgohiMHeJKnxCiGAwRrKrLxCCBlQZqWnEsWJIIaKc0yvOBHOwHPMyYDiRACDTTjb9or8e4Fhoym/V/BeybNXvyNxw9qv85P4yo49sAQNr9yzG5iQwfa+fdFEDNc8fId4jF75GFMDQ8xPjDFJMsRMzbd9O6YBAABgEObf9VwsPUAHNe4i47MyjjPivTMuROPHNM5U49E1bmXj2zYOduPlN1QD4jsM6WKYH0Q/IQ7MEHGIDVSUJOJFFTmrGOKqqncDCztVWUv854kAAAAASUVORK5CYII=";
            Assets.whiteEditIcon = "iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAv9JREFUaAXtmc1u1DAUhSdDi5BYgOBx4AEQ25bpdIp4KVawLz9CPABiiRAbWADiRZCQ+CmEc517pJOMx+0oGtuVYslzHdtNzudrX7vJbDalaQSmEUiNQJNqzN3Wtu0VPLNFNl1t0zT/cmsY/TyH6N0nVtfrUNsFBcPeR36L/BT5lumE3atNb1QPhcKukDV9xcXlgIHQuY/6iRD8QvmnX3+Dve196vQMBBJi6aLNnEnZgCzVCwNxYXRh75pSTwrBOoXhNLPIVj5B4Rw5hH3Ya8inyJZ+d2btlzC6ZoI3i9FAYlQA6p+5/E0wXDNPTDz6lvMKHr7vIh6h/Am5N1Vw/RzZUgyGXnnj94gOiLXtNEEcIQ6D1O7nM8xNezBsGGHYF11TD0bXzj3tv1PRw5tDWAyCU+UL2m+oOFyrZxTiWPsNn7PTa4F4gDITxXEKmWeGMFwz/JuiEAyxR1QDSwhWpWAYzY7cE/k3RKgkxDEVRyDYRBibZmHNuHALzXe8nH9x4+GEWFEp7NAT0hSKhLFpFqIZ5zyuLw0EoRgAProXGjQUnU7beIIQ6rGHNUyni6wJiqdViIOSENwnNp1iKThmYxDhflwjWSyUESIVYmMAVqcQh+6JohCxzW6TeNYrxKIGCD07qTgKjlntt6wB4kBUqjipXitqPx47ioRYromxnigKwR17IeOsIyzVa0XtVwXE2BDLNVFkOtETYze7Kk6xY48dDLFFPTEWouhmF47OWLJjIXh2KrJj80XA2IVdDsJ3Wb48e+9BlK9i1mLqoEJDbHaI1H9fPwwM6SIvw/5KvwU+0LwG5D7sn3CHDD8pELbZF6RUUoglxL/KDWHiKDYlNNWmECtAvATEXk5PUNwYEIU4gXh7sWYQZ7x5TpvaoEyoJdruqvtQaXVXvcIg7IVaMQgK61kIYtT6gPJ5qdwBsKd6Nkt55J33/Q6rkcs+GV9HfgxP2EvnujzhorcygBizxrZ61nmdwzSKdYLIjW3efw6PDNdP7FZT3TQC0whUMAL/AceaBRYh0iS9AAAAAElFTkSuQmCC";
            return Assets;
        }());
        UI.Assets = Assets;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASAttachmentThumbnailView = (function () {
            function KASAttachmentThumbnailView() {
                this.documentDiv = null;
                this.containerDiv = null;
            }
            KASAttachmentThumbnailView.prototype.getView = function (fileName, type, size) {
                var accessibilityString = "";
                var documentView = KASClient.UI.getElement("div", {
                    "padding": "8px",
                    "object-fit": "cover",
                    "position": "relative",
                    "box-shadow": "0px 0px 7px rgba(0, 0, 0, 0.3)"
                });
                var documentHeader = KASClient.UI.getElement("div", {
                    "color": "#98a3af",
                    "font-size": KASClient.UI.getScaledFontSize("12px"),
                    "letter-spacing": "2"
                });
                var documentHeaderText = "";
                switch (type) {
                    case KASClient.KASAttachmentType.Audio:
                        documentHeaderText = KASClient.Internal.getKASClientString("KASAttachmentAudioText");
                        this.containerDiv = KASClient.UI.getDiv({ "width": "100%", "position": "relative" });
                        break;
                    case KASClient.KASAttachmentType.Document:
                        documentHeaderText = KASClient.Internal.getKASClientString("KASAttachmentDocumentText");
                        break;
                    default:
                        break;
                }
                documentHeader.innerHTML = documentHeaderText;
                accessibilityString += documentHeaderText + ".";
                var documentName = KASClient.UI.getLabel(fileName, {
                    "color": "#006ff1",
                    "font-size": KASClient.UI.getScaledFontSize("14px"),
                    "padding-top": "4px",
                    "padding-bottom": "4px",
                    "white-space": "nowrap",
                    "overflow": "hidden",
                    "text-overflow": "ellipsis"
                });
                var fileExt = "";
                if (!KASClient.isEmptyString(fileName)) {
                    fileExt = fileName.split('.').pop().toLowerCase();
                    accessibilityString += (fileName + ".");
                }
                var documentIcon = KASClient.UI.getBase64Image(KASClient.UI.getAttachmentIconBase64(fileExt), {
                    "height": "12pt",
                    "width": "12pt",
                    "float": "left"
                });
                var sizeString = KASClient.formatSize(size);
                var documentSize = KASClient.UI.getLabel(sizeString, {
                    "color": "#6f7e8f",
                    "font-size": KASClient.UI.getScaledFontSize("12px"),
                    "padding-left": "3px",
                    "float": "left"
                });
                accessibilityString += (".size - " + sizeString + ". ");
                var documentInfo = KASClient.UI.getDiv({ "height": "20px" });
                KASClient.UI.addElement(documentIcon, documentInfo);
                KASClient.UI.addElement(documentSize, documentInfo);
                KASClient.UI.addElement(documentHeader, documentView);
                KASClient.UI.addElement(this.containerDiv, documentView);
                KASClient.UI.addElement(documentName, documentView);
                KASClient.UI.addElement(documentInfo, documentView);
                if (this.onTappedCallback) {
                    documentView.onclick = this.onTappedCallback;
                    accessibilityString += (KASClient.Internal.getKASClientString("TapToOpenFormatText", documentHeaderText) + ".");
                }
                KASClient.UI.setAccessibilityBasic(documentHeader, true);
                KASClient.UI.setAccessibilityBasic(documentIcon, true);
                KASClient.UI.setAccessibilityBasic(documentSize, true);
                KASClient.UI.setAccessibilityBasic(documentName, false, UI.KASFormAccessibilityRole.Text, accessibilityString);
                return documentView;
            };
            return KASAttachmentThumbnailView;
        }());
        UI.KASAttachmentThumbnailView = KASAttachmentThumbnailView;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var State;
        (function (State) {
            State[State["AttachmentsAvailable"] = 0] = "AttachmentsAvailable";
            State[State["AttachmentsDownloading"] = 1] = "AttachmentsDownloading";
            State[State["AttachmentsDownloadFailed"] = 2] = "AttachmentsDownloadFailed";
            State[State["AttachmentsNeverDownloaded"] = 3] = "AttachmentsNeverDownloaded";
        })(State = UI.State || (UI.State = {}));
        var KASAttachmentView = (function () {
            function KASAttachmentView() {
                this.view = null;
                this.shouldShowRemoveButton = false;
                this.tapEnabled = false;
                this.defaultBlurColor = "rgba(0, 0, 0, 0.5)";
                this.view = KASClient.UI.getElement("div", { "background": "white" });
            }
            KASAttachmentView.prototype.getView = function () {
                return this.view;
            };
            // public setState(state: State) {
            //     switch (state) {
            //         case State.AttachmentsAvailable:
            //             //this.populateView();
            //             break;
            //         case State.AttachmentsDownloading:
            //             this.showLoadingIndicator();
            //             break;
            //         case State.AttachmentsNeverDownloaded:
            //             this.showRetryButton();
            //             break;
            //         case State.AttachmentsDownloadFailed:
            //             this.showRetryButton();
            //             break;
            //         default:
            //             break;
            //     }
            // }
            KASAttachmentView.prototype.showLoadingIndicator = function () {
                this.addLoadingIndicatorToDiv(this.view);
            };
            KASAttachmentView.prototype.showRetryButton = function () {
                this.addRetryButtonToDiv(this.view);
            };
            KASAttachmentView.prototype.addLoadingIndicatorToDiv = function (div, blurColor) {
                if (blurColor === void 0) { blurColor = this.defaultBlurColor; }
                var containerDiv = this.getStatusViewForState(State.AttachmentsDownloading);
                KASClient.UI.removeElement(this.blurView);
                this.blurView = this.getBlurViewWithDiv(containerDiv, blurColor);
                this.blurView.onclick = function (event) { event.stopPropagation(); };
                KASClient.UI.addElement(this.blurView, div);
            };
            KASAttachmentView.prototype.addRetryButtonToDiv = function (div, blurColor) {
                if (blurColor === void 0) { blurColor = this.defaultBlurColor; }
                var containerDiv = this.getStatusViewForState(State.AttachmentsDownloadFailed);
                KASClient.UI.removeElement(this.blurView);
                this.blurView = this.getBlurViewWithDiv(containerDiv, blurColor);
                this.blurView.onclick = this.retryButtonCallback;
                KASClient.UI.addElement(this.blurView, div);
            };
            KASAttachmentView.prototype.addTapToDownloadButtonToDiv = function (div, blurColor) {
                if (blurColor === void 0) { blurColor = this.defaultBlurColor; }
                var containerDiv = this.getStatusViewForState(State.AttachmentsNeverDownloaded);
                KASClient.UI.removeElement(this.blurView);
                this.blurView = this.getBlurViewWithDiv(containerDiv);
                this.blurView.onclick = this.retryButtonCallback;
                KASClient.UI.addElement(this.blurView, div);
            };
            KASAttachmentView.prototype.getStatusViewForState = function (state) {
                var containerDiv = KASClient.UI.getDiv({ "width": "100px", "height": "25px", "margin": "auto", "background": "transparent" });
                var statusIcon, statusText;
                var accessibilityString = "";
                switch (state) {
                    case State.AttachmentsDownloading:
                        statusIcon = KASClient.UI.getLoadingSpinner({ "margin": "0 auto" });
                        accessibilityString += KASClient.Internal.getKASClientString("LoadingText");
                        break;
                    case State.AttachmentsNeverDownloaded:
                        statusIcon = KASClient.UI.getElement("div", this.getLoadingViewAttributes(KASClient.UI.getBase64Src(UI.Assets.tapToDownloadDark)));
                        statusText = KASClient.UI.getLabel(KASClient.Internal.getKASClientString("KASFormTapToDownloadText"), { "display": "block", "width": "100px", "font-size": KASClient.UI.getScaledFontSize("11px"), "text-align": "center", "color": "lightgray" });
                        break;
                    case State.AttachmentsDownloadFailed:
                        statusIcon = KASClient.UI.getElement("div", this.getLoadingViewAttributes(KASClient.UI.getBase64Src(UI.Assets.retry)));
                        statusText = KASClient.UI.getLabel(KASClient.Internal.getKASClientString("KASFormTapToRetryText"), { "display": "block", "width": "100px", "font-size": KASClient.UI.getScaledFontSize("11px"), "text-align": "center", "color": "lightgray" });
                        break;
                    default:
                        break;
                }
                KASClient.UI.addElement(statusIcon, containerDiv);
                if (statusText) {
                    KASClient.UI.setAccessibilityBasic(statusText, true);
                    accessibilityString += statusText.innerText;
                    containerDiv.style.height = "40px";
                    KASClient.UI.addElement(statusText, containerDiv);
                }
                KASClient.UI.setAccessibilityBasic(statusIcon, true);
                KASClient.UI.setAccessibilityBasic(containerDiv, false, UI.KASFormAccessibilityRole.Text, accessibilityString);
                return containerDiv;
            };
            KASAttachmentView.prototype.getBlurViewWithDiv = function (ele, blurColor) {
                if (blurColor === void 0) { blurColor = this.defaultBlurColor; }
                var blurView = KASClient.UI.getElement("div", this.getBlurViewAttributes());
                blurView.style.background = blurColor;
                KASClient.UI.addElement(ele, blurView);
                return blurView;
            };
            KASAttachmentView.prototype.getLoadingViewAttributes = function (pictureUrl) {
                return {
                    "display": "block",
                    "background": "transparent url('" + pictureUrl + "')",
                    "margin": "0 auto",
                    "width": "28px",
                    "height": "28px",
                    "background-size": "cover",
                    "justify-content": "center",
                    "align-items": "center"
                };
            };
            KASAttachmentView.prototype.getLoadingViewAttributes1 = function () {
                return {
                    "position": "absolute",
                    "display": "block",
                    "margin": "auto",
                    "top": "0",
                    "left": "0",
                    "bottom": "0",
                    "right": "0",
                    "width": "28px",
                    "height": "28px",
                    "background-size": "cover",
                    "justify-content": "center",
                    "align-items": "center"
                };
            };
            KASAttachmentView.prototype.getBlurViewAttributes = function () {
                return {
                    "z-index": "2",
                    "position": "absolute",
                    "top": "0",
                    "left": "0",
                    "right": "0",
                    "bottom": "0",
                    "display": "flex"
                };
            };
            return KASAttachmentView;
        }());
        UI.KASAttachmentView = KASAttachmentView;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASFormAccessibilityRole = (function () {
            function KASFormAccessibilityRole() {
            }
            KASFormAccessibilityRole.None = "none";
            KASFormAccessibilityRole.Text = "text";
            KASFormAccessibilityRole.Button = "button";
            KASFormAccessibilityRole.Image = "img";
            KASFormAccessibilityRole.Checkbox = "checkbox";
            KASFormAccessibilityRole.Radio = "radio";
            KASFormAccessibilityRole.TextBox = "textbox";
            return KASFormAccessibilityRole;
        }());
        UI.KASFormAccessibilityRole = KASFormAccessibilityRole;
        var KASFormAccessibilityKey = (function () {
            function KASFormAccessibilityKey() {
            }
            KASFormAccessibilityKey.Role = "role"; // Traits  of element.. value should be from KASFormAccessibilityRole
            KASFormAccessibilityKey.Hidden = "aria-hidden";
            KASFormAccessibilityKey.Label = "aria-label";
            KASFormAccessibilityKey.RoleDescription = "aria-roledescription";
            KASFormAccessibilityKey.Disabled = "aria-disabled";
            KASFormAccessibilityKey.Checked = "aria-checked";
            KASFormAccessibilityKey.LabelledBy = "aria-labelledby";
            return KASFormAccessibilityKey;
        }());
        UI.KASFormAccessibilityKey = KASFormAccessibilityKey;
        function setAccessibilityBasic(element, isHidden, role, label) {
            if (isHidden === void 0) { isHidden = true; }
            if (role === void 0) { role = null; }
            if (label === void 0) { label = null; }
            setAccessibilityAttribute(element, KASFormAccessibilityKey.Hidden, isHidden ? "true" : "false");
            if (role != null) {
                setAccessibilityAttribute(element, KASFormAccessibilityKey.Role, role);
            }
            if (label != null) {
                setAccessibilityAttribute(element, KASFormAccessibilityKey.Label, label);
            }
        }
        UI.setAccessibilityBasic = setAccessibilityBasic;
        function setAccessibilityAttribute(element, key, value) {
            element.setAttribute(key, value);
        }
        UI.setAccessibilityAttribute = setAccessibilityAttribute;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASFormModule = (function () {
            function KASFormModule() {
                this.header = null;
                this.footer = null;
                this.footerAction = null;
                this.contentView = null;
                this.showLeftBar = false;
                this.footerTopPadding = false;
                this.disableShadow = false;
                this.fillParent = false;
                this.attributes = null;
                this.customizations = [];
                this.view = null;
            }
            KASFormModule.prototype.getView = function () {
                if (this.view == null) {
                    var moduleContent = UI.getVerticalDiv(this.getChildViews(), this.getModuleContentAttributes());
                    var leftBar = UI.getDiv(this.getModuleLeftBarAttributes());
                    this.view = UI.getHorizontalDiv([leftBar, moduleContent], this.getModuleAttributes());
                }
                if (this.customizations && this.customizations.length > 0) {
                    KASClient.Customise.register(this.view, this.customizations);
                }
                return this.view;
            };
            KASFormModule.prototype.recreateView = function () {
                this.view = null;
                return this.getView();
            };
            KASFormModule.prototype.getChildViews = function () {
                var childViews = [];
                if (this.header) {
                    childViews.push(this.getHeaderView());
                }
                if (this.contentView) {
                    childViews.push(this.getContentView());
                }
                if (this.footer) {
                    childViews.push(this.getFooterView());
                }
                return childViews;
            };
            KASFormModule.prototype.getHeaderView = function () {
                return UI.getLabel(this.header, this.getHeaderAttributes());
            };
            KASFormModule.prototype.getContentView = function () {
                var contentDiv = UI.getDiv(this.getContentAttributes());
                UI.addElement(this.contentView, contentDiv);
                return contentDiv;
            };
            KASFormModule.prototype.getFooterView = function () {
                var footerView = UI.getLabel(this.footer, this.getFooterAttributes());
                UI.addClickEvent(footerView, this.footerAction);
                if (this.footerAction != null) {
                    UI.setAccessibilityAttribute(footerView, UI.KASFormAccessibilityKey.Role, UI.KASFormAccessibilityRole.Button);
                }
                return footerView;
            };
            KASFormModule.prototype.getModuleAttributes = function () {
                var attributes = {};
                attributes["margin"] = MODULE_GAP;
                attributes["border-radius"] = "0";
                if (!this.disableShadow) {
                    attributes["box-shadow"] = "0pt 1pt 2pt 0pt " + SHADOW_COLOR;
                }
                attributes["background-color"] = "rgb(255, 255, 255)";
                attributes["position"] = "relative";
                return Object.assign(attributes, this.attributes);
            };
            KASFormModule.prototype.getModuleLeftBarAttributes = function () {
                var attributes = {};
                attributes["position"] = "absolute";
                attributes["top"] = "0";
                attributes["height"] = "100%";
                if (this.showLeftBar) {
                    attributes["width"] = "4pt";
                }
                else {
                    attributes["display"] = "none";
                }
                attributes["background-color"] = LIGHT_BLUE_COLOR;
                return attributes;
            };
            KASFormModule.prototype.getModuleContentAttributes = function () {
                var attributes = {};
                attributes["flex"] = "1";
                return attributes;
            };
            KASFormModule.prototype.getHeaderAttributes = function () {
                var attributes = {};
                attributes["font-size"] = UI.getScaledFontSize("10pt");
                attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                attributes["color"] = TEXT_SECONDARY_COLOR;
                if (this.header) {
                    attributes["padding"] = "8pt 12pt 0 12pt";
                }
                return attributes;
            };
            KASFormModule.prototype.getContentAttributes = function () {
                var attributes = {};
                attributes["padding"] = "0";
                if (this.footerTopPadding && !this.footer) {
                    attributes["padding-bottom"] = "8pt";
                }
                return attributes;
            };
            KASFormModule.prototype.getFooterAttributes = function () {
                var attributes = {};
                attributes["font-size"] = UI.getScaledFontSize("12pt");
                attributes["font-weight"] = SEMIBOLD_FONT_WEIGHT;
                attributes["color"] = BLUE_COLOR;
                if (this.footer) {
                    attributes["padding"] = "12pt";
                    attributes["border-top"] = LINE_SEPARATOR_ATTRIBUTE;
                }
                return attributes;
            };
            KASFormModule.prototype.refreshView = function (oldView, newView) {
                UI.replaceElement(newView, oldView, oldView.parentElement);
            };
            return KASFormModule;
        }());
        UI.KASFormModule = KASFormModule;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
/// <reference path="./KASFormModule.ts" />
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASFormRowsModule = (function (_super) {
            __extends(KASFormRowsModule, _super);
            function KASFormRowsModule() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.accessoryViews = null;
                _this.footerViews = null;
                _this.rowAction = null;
                _this.rowActions = null;
                _this.showChevron = true;
                _this.showChevrons = null;
                _this.showEditOptions = null;
                _this.rowViews = null;
                //Accessibility
                _this.accessibilityAttributes = {};
                return _this;
            }
            KASFormRowsModule.prototype.getView = function () {
                if (this.view == null) {
                    if (this.rowActions == null) {
                        this.rowActions = [];
                        for (var i = 0; i < this.getNumberOfRows(); i++) {
                            this.rowActions.push(this.rowAction);
                        }
                    }
                    this.rowViews = [];
                    for (var i = 0; i < this.getNumberOfRows(); i++) {
                        var row = this.createRow(i);
                        this.rowViews.push(row);
                    }
                    this.contentView = UI.getVerticalDiv(this.rowViews);
                    this.view = _super.prototype.getView.call(this);
                }
                return this.view;
            };
            KASFormRowsModule.prototype.recreateView = function () {
                this.view = null;
                return this.getView();
            };
            KASFormRowsModule.prototype.createRow = function (i) {
                // Get content
                var rowView = this.getRowView(i);
                // Add accessory view
                if (this.accessoryViews && this.accessoryViews.length > i && this.accessoryViews[i]) {
                    rowView = UI.getHorizontalDiv([rowView, this.accessoryViews[i]], UI.getCoverRestOfTheSpaceAttributes());
                }
                else {
                    UI.addCSS(rowView, UI.getCoverRestOfTheSpaceAttributes());
                }
                // Add chevron
                if ((this.showChevron && this.rowActions.length > i && this.rowActions[i])
                    || (this.showChevrons && this.showChevrons.length > i && this.showChevrons[i])) {
                    var chevronIcon = UI.getChevronIcon();
                    UI.setAccessibilityBasic(chevronIcon, false, UI.KASFormAccessibilityRole.Button, KASClient.Internal.getKASClientString("KASFormPageShowDetail"));
                    rowView = UI.getHorizontalDiv([rowView, UI.getSpace(), chevronIcon]);
                }
                else if (this.showEditOptions && this.showEditOptions.length > i && this.showEditOptions[i]) {
                    var editIcon = UI.getEditIcon();
                    UI.setAccessibilityBasic(editIcon, false, UI.KASFormAccessibilityRole.Button, KASClient.Internal.getKASClientString("KASFormEditDetail"));
                    rowView = UI.getHorizontalDiv([rowView, UI.getSpace(), editIcon]);
                }
                // Add footer View
                if (this.footerViews && this.footerViews.length > i && this.footerViews[i]) {
                    UI.addCSS(rowView, this.getRowAttributeForFooterView());
                    rowView = UI.getVerticalDiv([rowView, this.footerViews[i]], this.getFooterViewAttributes());
                }
                // Add row action
                if (this.rowActions && this.rowActions.length > i && this.rowActions[i]) {
                    UI.addClickEvent(rowView, (function (rowAction, rowIndex) {
                        rowAction(rowIndex);
                    }).bind(null, this.rowActions[i], i));
                }
                // Add line separator
                UI.addCSS(rowView, this.getRowAttributes(i));
                for (var key in this.accessibilityAttributes[i]) {
                    UI.setAccessibilityAttribute(rowView, key, this.accessibilityAttributes[i][key]);
                }
                return rowView;
            };
            KASFormRowsModule.prototype.setAccessibilityAttribute = function (index, key, value) {
                if (this.rowViews != null && this.rowViews.length > index) {
                    UI.setAccessibilityAttribute(this.rowViews[index], key, value);
                }
                if (this.accessibilityAttributes[index] == undefined)
                    this.accessibilityAttributes[index] = {};
                this.accessibilityAttributes[index][key] = value;
            };
            KASFormRowsModule.prototype.updateRow = function (i) {
                var oldRow = this.rowViews[i];
                var newRow = this.createRow(i);
                if (this.rowViews && this.rowViews.length > i) {
                    this.rowViews[i] = newRow;
                }
                UI.replaceElement(newRow, oldRow, this.contentView);
            };
            KASFormRowsModule.prototype.getNumberOfRows = function () {
                console.assert(false);
                return 0; // Should be implemented by the derived classes
            };
            KASFormRowsModule.prototype.getRowView = function (i) {
                console.assert(false);
                return null; // Should be implemented by derived classes
            };
            KASFormRowsModule.prototype.getRowAttributes = function (i) {
                var attributes = {};
                attributes["padding"] = "8pt 12pt 8pt 12pt";
                if (this.getNumberOfRows() > i + 1) {
                    attributes["border-bottom"] = LINE_SEPARATOR_ATTRIBUTE;
                }
                return attributes;
            };
            KASFormRowsModule.prototype.getFooterViewAttributes = function () {
                var attributes = {};
                return attributes;
            };
            KASFormRowsModule.prototype.getRowAttributeForFooterView = function () {
                var attributes = {};
                attributes["flex"] = "0 0 auto";
                return attributes;
            };
            return KASFormRowsModule;
        }(UI.KASFormModule));
        UI.KASFormRowsModule = KASFormRowsModule;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
/// <reference path="./KASFormRowsModule.ts" />
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASFormCountImageTitleActionModule = (function (_super) {
            __extends(KASFormCountImageTitleActionModule, _super);
            function KASFormCountImageTitleActionModule() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.counts = null;
                _this.imageUrls = null;
                _this.titles = null;
                _this.showCounts = true;
                _this.showCountBars = true;
                _this.countBarHeight = "3pt";
                _this.countBarColors = null;
                return _this;
            }
            KASFormCountImageTitleActionModule.prototype.getNumberOfRows = function () {
                if (this.titles == null) {
                    return 0;
                }
                return this.titles.length;
            };
            KASFormCountImageTitleActionModule.prototype.getRowView = function (i) {
                var rowItems = [];
                if (this.showCounts && this.counts && this.counts.length > i && this.counts[i] != -1) {
                    var countLabel = UI.getLabel("" + this.counts[i], this.getCountAttributes(i));
                    rowItems.push(countLabel);
                }
                if (this.imageUrls && this.imageUrls.length > i && this.imageUrls[i]) {
                    var image = UI.getImage(this.imageUrls[i], this.getImageAttributes());
                    rowItems.push(image);
                }
                var titleLabel = UI.getLabel(this.titles[i], this.getTitleAttributes(i));
                rowItems.push(titleLabel);
                var rowDiv = UI.getHorizontalDiv(rowItems);
                return this.createRowCountBar(i, rowDiv);
            };
            KASFormCountImageTitleActionModule.prototype.getTotalCounts = function () {
                var totalCounts = 0;
                for (var j = 0; j < this.counts.length; j++) {
                    totalCounts += this.counts[j];
                }
                return totalCounts;
            };
            KASFormCountImageTitleActionModule.prototype.createRowCountBar = function (i, row) {
                if (this.showCountBars && this.counts.length > i && this.counts[i]) {
                    var ratio = 100 * (this.counts[i] / this.getTotalCounts());
                    var countBarDiv = UI.getDiv(this.getCountBarAttributes(i, ratio + "%"));
                    return UI.getVerticalDiv([row, countBarDiv]);
                }
                return row;
            };
            KASFormCountImageTitleActionModule.prototype.getCountAttributes = function (i) {
                var attributes = {};
                attributes["width"] = "28pt";
                attributes["flex"] = "none";
                attributes["overflow"] = "hidden";
                attributes["font-size"] = UI.getScaledFontSize("12pt");
                attributes["font-weight"] = SEMIBOLD_FONT_WEIGHT;
                attributes["color"] = TEXT_PRIMARY_COLOR;
                attributes["padding"] = "4pt 0 4pt 0";
                return attributes;
            };
            KASFormCountImageTitleActionModule.prototype.getImageAttributes = function () {
                var attributes = {};
                attributes["width"] = "28pt";
                attributes["height"] = "28pt";
                attributes["margin"] = "4pt 8pt 4pt 0";
                attributes["border"] = LINE_SEPARATOR_ATTRIBUTE;
                return attributes;
            };
            KASFormCountImageTitleActionModule.prototype.getTitleAttributes = function (i) {
                var attributes = {};
                attributes["flex"] = "1";
                attributes["font-size"] = UI.getScaledFontSize("12pt");
                attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                attributes["color"] = TEXT_PRIMARY_COLOR;
                attributes["padding"] = "4pt 0 4pt 0";
                return attributes;
            };
            KASFormCountImageTitleActionModule.prototype.getCountBarAttributes = function (i, width) {
                var attributes = {};
                attributes["margin"] = "0pt -12pt -8pt -12pt"; // Should conform to row-module's padding
                attributes["margin-top"] = "calc(8pt - " + this.countBarHeight + ")";
                attributes["width"] = width;
                attributes["height"] = this.countBarHeight; // margin-top should conform to this value
                attributes["background-color"] = (this.countBarColors && this.countBarColors.length > i ? this.countBarColors[i] : LIGHT_BLUE_COLOR);
                return attributes;
            };
            return KASFormCountImageTitleActionModule;
        }(UI.KASFormRowsModule));
        UI.KASFormCountImageTitleActionModule = KASFormCountImageTitleActionModule;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var FORM_TITLE_VISIBLE_LENGTH = 200;
var FORM_TITLE_LINE_HEIGHT = "1.2em"; // Height of one line
var FORM_TITLE_VISIBLE_HEIGHT = "7.2em"; // Max 6 lines by default
var FORM_TITLE_MAX_HEIGHT = "120em"; // Max 100 lines
var FORM_DESCRIPTION_VISIBLE_LENGTH = 240;
var FORM_DESCRIPTION_LINE_HEIGHT = "1.2em"; // Height of one line
var FORM_DESCRIPTION_VISIBLE_HEIGHT = "7.2em"; // Max 6 lines by default
var FORM_DESCRIPTION_MAX_HEIGHT = "120em"; // Max 100 lines
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASFormDetailsModule = (function () {
            function KASFormDetailsModule() {
                this.coverImagePath = null;
                this.creator = null;
                this.assignedToLabel = null;
                this.assignees = null;
                this.assigneesActionTitle = null;
                this.assigneesAction = null;
                this.formTitle = null;
                this.formDescription = null;
                this.formSubtitle = null;
                this.viewMoreText = null;
                this.viewLessText = null;
                this.likes = 0;
                this.didILike = false;
                this.comments = 0;
                this.likeAction = null;
                this.showAllCommentsAction = null;
                this.hideSenderSection = false;
                this.hideTitleSection = false;
                this.hideLikes = false;
                this.hideComments = false;
                this.hideLikesAndCommentsSection = false;
                this.useOriginalName = false;
                this.customizations = [];
                this.showDrawer = false;
                this.drawerCollapsed = false;
                this.view = null;
                this.titleDiv = null;
                this.descriptionDiv = null;
            }
            KASFormDetailsModule.prototype.getView = function () {
                if (!this.view) {
                    if (this.formTitle.trim().length > FORM_TITLE_VISIBLE_LENGTH || (this.formDescription && this.formDescription.trim().length > FORM_DESCRIPTION_VISIBLE_LENGTH)) {
                        this.showDrawer = true;
                        this.drawerCollapsed = true; // Default is collapsed
                    }
                    else {
                        this.showDrawer = false;
                    }
                    var views = [];
                    if (this.coverImagePath) {
                        views.push(this.getCoverImageDiv());
                    }
                    if (!this.hideSenderSection) {
                        views.push(this.getCreatorDetailsRow());
                        views.push(UI.getSpace());
                    }
                    if (!this.hideTitleSection) {
                        views.push(this.getFormTitleRow());
                        views.push(this.getFormDescriptionRow());
                        views.push(this.getFormSubtitleRow());
                        views.push(this.getViewMoreOrLessRow());
                        views.push(UI.getSpace("10pt"));
                    }
                    if (!this.shouldHideLikesAndCommentsSection()) {
                        views.push(this.getLikesCommentsCountRow());
                    }
                    this.view = UI.getVerticalDiv(views, this.getDetailsModuleAttributes());
                }
                if (this.customizations) {
                    KASClient.Customise.register(this.view, this.customizations);
                }
                return this.view;
            };
            KASFormDetailsModule.prototype.shouldHideLikesAndCommentsSection = function () {
                return (this.hideLikesAndCommentsSection || (this.hideLikes && this.hideComments));
            };
            KASFormDetailsModule.prototype.recreateView = function () {
                this.view = null;
                return this.getView();
            };
            KASFormDetailsModule.prototype.getCoverImageDiv = function () {
                if (this.coverImagePath == null) {
                    return null;
                }
                var imageElement = UI.getImage(this.coverImagePath, {
                    "margin": "-12pt -12pt 12pt -12pt",
                    "flex": "1",
                    "height": "150px"
                });
                UI.setAccessibilityBasic(imageElement, false, UI.KASFormAccessibilityRole.Image, KASClient.Internal.getKASClientString("KASFormCoverImageDetail"));
                imageElement.onclick = function () {
                    KASClient.App.showImageImmersiveView([this.coverImagePath]);
                }.bind(this);
                return imageElement;
            };
            KASFormDetailsModule.prototype.getCreatorDetailsRow = function () {
                var userProfilePicDiv = UI.getProfilePic(this.creator);
                UI.setAccessibilityAttribute(userProfilePicDiv, UI.KASFormAccessibilityKey.Hidden, "true");
                var userNameLabel = UI.getLabel((this.useOriginalName ? this.creator.originalName : this.creator.name), this.getUserNameAttributes());
                var assignedToLabel = UI.getLabel(this.assignedToLabel, this.getSentToAttributes());
                var assigneesLabel = UI.getLabel(this.assignees, this.getAssigneesAttributes());
                var assigneesActionLabel = null;
                if (this.assigneesActionTitle) {
                    assigneesActionLabel = UI.getLabel(this.assigneesActionTitle, this.getAssigneesActionAttributes());
                    UI.addClickEvent(assigneesActionLabel, this.assigneesAction);
                }
                var sentToAssigneesLabel = UI.getHorizontalDiv([assignedToLabel, UI.getSpace("2pt"), assigneesLabel, UI.getSpace("2pt"), assigneesActionLabel, UI.getFlexibleSpace()]);
                UI.setAccessibilityAttribute(sentToAssigneesLabel, UI.KASFormAccessibilityKey.Role, this.assigneesActionTitle ? UI.KASFormAccessibilityRole.Button : UI.KASFormAccessibilityRole.Text);
                var verticalSpace = (KASClient.getPlatform() == KASClient.Platform.Android ? UI.getSpace("2pt") : null);
                var userNameSentToConversationLabel = UI.getVerticalDiv([userNameLabel, verticalSpace, sentToAssigneesLabel], UI.getCoverRestOfTheSpaceAttributes());
                var creatorDetailsRow = UI.getHorizontalDiv([userProfilePicDiv, UI.getSpace("8pt"), userNameSentToConversationLabel]);
                return creatorDetailsRow;
            };
            KASFormDetailsModule.prototype.getFormTitleRow = function () {
                this.titleDiv = UI.getLabel("", this.getFormTitleAttributes());
                this.setFormTitle();
                return this.titleDiv;
            };
            KASFormDetailsModule.prototype.setFormTitle = function () {
                if (this.showDrawer && this.drawerCollapsed) {
                    UI.setText(this.titleDiv, KASClient.getEllipsizedString(this.formTitle, FORM_TITLE_VISIBLE_LENGTH));
                }
                else {
                    UI.setText(this.titleDiv, this.formTitle);
                }
            };
            KASFormDetailsModule.prototype.getFormDescriptionRow = function () {
                if (this.formDescription == null || this.formDescription == "") {
                    return null;
                }
                this.descriptionDiv = UI.getLabel("", this.getFormDescriptionAttributes());
                this.setFormDescription();
                return this.descriptionDiv;
            };
            KASFormDetailsModule.prototype.setFormDescription = function () {
                if (this.formDescription == null || this.formDescription == "") {
                    return;
                }
                if (this.showDrawer && this.drawerCollapsed) {
                    UI.setText(this.descriptionDiv, KASClient.getEllipsizedString(this.formDescription, FORM_DESCRIPTION_VISIBLE_LENGTH));
                }
                else {
                    UI.setText(this.descriptionDiv, this.formDescription);
                }
            };
            KASFormDetailsModule.prototype.getFormSubtitleRow = function () {
                if (this.formSubtitle) {
                    var subtitleDiv = UI.getLabel(this.formSubtitle, this.getFormSubtitleAttributes());
                    UI.setAccessibilityBasic(subtitleDiv, false, UI.KASFormAccessibilityRole.Text);
                    return subtitleDiv;
                }
                return null;
            };
            KASFormDetailsModule.prototype.getLikesCommentsCountRow = function () {
                var _this = this;
                var likesAndCommentsElements = [];
                if (!this.hideLikes) {
                    var likeIconImage = UI.getBase64Image((this.didILike ? UI.Assets.unlike : UI.Assets.like), this.getLikeIconAttributes());
                    var likeTitleDiv = UI.getLabel("" + this.likes, this.getIconTitleAttributes());
                    var likeDiv = UI.getHorizontalDiv([likeIconImage, UI.getSpace("5pt"), likeTitleDiv]);
                    UI.setAccessibilityBasic(likeDiv, false, UI.KASFormAccessibilityRole.Button, KASClient.Internal.getKASClientString(this.likes == 1 ? "KASFormPageLikeCount" : "KASFormPageLikesCount", this.likes));
                    UI.addClickEvent(likeDiv, function () {
                        var likeSrc;
                        UI.setAccessibilityAttribute(likeDiv, UI.KASFormAccessibilityKey.Hidden, "true");
                        if (_this.didILike && _this.likes > 0) {
                            _this.likes--;
                            _this.didILike = false;
                            likeSrc = UI.Assets.like;
                        }
                        else {
                            _this.likes++;
                            _this.didILike = true;
                            likeSrc = UI.Assets.unlike;
                        }
                        likeIconImage.src = UI.getBase64Src(likeSrc);
                        likeTitleDiv.innerHTML = "" + _this.likes;
                        UI.setAccessibilityBasic(likeDiv, false, UI.KASFormAccessibilityRole.Button, KASClient.Internal.getKASClientString(_this.likes == 1 ? "KASFormPageLikeCount" : "KASFormPageLikesCount", _this.likes));
                        UI.setText(likeTitleDiv, "" + _this.likes);
                        _this.likeAction();
                    });
                    likesAndCommentsElements.push(likeDiv);
                    likesAndCommentsElements.push(UI.getSpace("10pt"));
                }
                if (!this.hideComments) {
                    var commentIconImage = UI.getBase64Image(UI.Assets.comment, this.getCommentIconAttributes());
                    var commentTitleDiv = UI.getLabel("" + this.comments, this.getIconTitleAttributes());
                    var commentDiv = UI.getHorizontalDiv([commentIconImage, UI.getSpace("5pt"), commentTitleDiv]);
                    var chevronIcon = UI.getChevronIcon();
                    if (this.showAllCommentsAction != null) {
                        UI.setAccessibilityBasic(commentDiv, false, UI.KASFormAccessibilityRole.Button, KASClient.Internal.getKASClientString(this.comments == 1 ? "KASFormPageCommentCount" : "KASFormPageCommentsCount", this.comments));
                        UI.setAccessibilityBasic(chevronIcon, false, UI.KASFormAccessibilityRole.Button, KASClient.Internal.getKASClientString("KASFormPageShowDetail"));
                    }
                    else {
                        UI.setAccessibilityBasic(commentDiv, false, UI.KASFormAccessibilityRole.Text, KASClient.Internal.getKASClientString(this.comments == 1 ? "KASFormPageCommentCount" : "KASFormPageCommentsCount", this.comments));
                        UI.setAccessibilityAttribute(chevronIcon, UI.KASFormAccessibilityKey.Hidden, "true");
                    }
                    var commentCompositeDiv = UI.getHorizontalDiv([commentDiv, chevronIcon], UI.getCoverRestOfTheSpaceAttributes());
                    UI.setAccessibilityBasic(commentCompositeDiv, false, UI.KASFormAccessibilityRole.None, "");
                    UI.addClickEvent(commentCompositeDiv, this.showAllCommentsAction);
                    likesAndCommentsElements.push(commentCompositeDiv);
                }
                return UI.getHorizontalDiv(likesAndCommentsElements, this.getLikesCommentsCountAttributes());
            };
            KASFormDetailsModule.prototype.getViewMoreOrLessRow = function () {
                var _this = this;
                if (this.showDrawer) {
                    var viewMoreOrLessLabel = UI.getLabel(this.viewMoreText, this.getViewMoreOrLessAttributes());
                    UI.addClickEvent(viewMoreOrLessLabel, function () {
                        if (!_this.drawerCollapsed) {
                            if (_this.titleDiv) {
                                _this.titleDiv.style.maxHeight = FORM_TITLE_VISIBLE_HEIGHT;
                            }
                            if (_this.descriptionDiv) {
                                _this.descriptionDiv.style.maxHeight = FORM_TITLE_VISIBLE_HEIGHT;
                            }
                            _this.drawerCollapsed = true;
                            _this.setFormTitle();
                            _this.setFormDescription();
                            UI.setText(viewMoreOrLessLabel, _this.viewMoreText);
                        }
                        else {
                            if (_this.titleDiv) {
                                _this.titleDiv.style.maxHeight = FORM_TITLE_MAX_HEIGHT;
                            }
                            if (_this.descriptionDiv) {
                                _this.descriptionDiv.style.maxHeight = FORM_TITLE_MAX_HEIGHT;
                            }
                            _this.drawerCollapsed = false;
                            _this.setFormTitle();
                            _this.setFormDescription();
                            UI.setText(viewMoreOrLessLabel, _this.viewLessText);
                        }
                    });
                    return viewMoreOrLessLabel;
                }
                else {
                    return null;
                }
            };
            KASFormDetailsModule.prototype.getDetailsModuleAttributes = function () {
                var attributes = {};
                attributes["padding"] = "12pt 12pt 0 12pt";
                attributes["border-bottom"] = "1pt solid rgb(219, 219, 219)";
                attributes["background-color"] = "rgb(255, 255, 255)";
                return attributes;
            };
            KASFormDetailsModule.prototype.getUserNameAttributes = function () {
                var attributes = {};
                attributes["font-size"] = UI.getScaledFontSize("10pt");
                attributes["font-weight"] = SEMIBOLD_FONT_WEIGHT;
                attributes["color"] = TEXT_PRIMARY_COLOR;
                return attributes;
            };
            KASFormDetailsModule.prototype.getSentToAttributes = function () {
                var attributes = {};
                attributes["font-size"] = UI.getScaledFontSize("10pt");
                attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                attributes["color"] = TEXT_SECONDARY_COLOR;
                return attributes;
            };
            KASFormDetailsModule.prototype.getAssigneesAttributes = function () {
                var attributes = {};
                attributes["font-size"] = UI.getScaledFontSize("10pt");
                attributes["font-weight"] = SEMIBOLD_FONT_WEIGHT;
                attributes["color"] = TEXT_SECONDARY_COLOR;
                return attributes;
            };
            KASFormDetailsModule.prototype.getAssigneesActionAttributes = function () {
                var attributes = this.getAssigneesAttributes();
                attributes["color"] = BLUE_COLOR;
                return attributes;
            };
            KASFormDetailsModule.prototype.getFormTitleAttributes = function () {
                var attributes = {};
                attributes["font-size"] = UI.getScaledFontSize("14pt");
                attributes["font-weight"] = SEMIBOLD_FONT_WEIGHT;
                attributes["color"] = TEXT_PRIMARY_COLOR;
                attributes["line-height"] = FORM_TITLE_LINE_HEIGHT;
                attributes["max-height"] = FORM_TITLE_VISIBLE_HEIGHT;
                attributes["transition"] = "max-height 0.5s ease-in-out";
                attributes["overflow"] = "hidden";
                return attributes;
            };
            KASFormDetailsModule.prototype.getFormDescriptionAttributes = function () {
                var attributes = {};
                attributes["font-size"] = UI.getScaledFontSize("12pt");
                attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                attributes["color"] = "#32495f";
                attributes["line-height"] = FORM_DESCRIPTION_LINE_HEIGHT;
                attributes["max-height"] = FORM_DESCRIPTION_VISIBLE_HEIGHT;
                attributes["transition"] = "max-height 0.5s ease-in-out";
                attributes["overflow"] = "hidden";
                return attributes;
            };
            KASFormDetailsModule.prototype.getFormSubtitleAttributes = function () {
                var attributes = {};
                attributes["font-size"] = UI.getScaledFontSize("12pt");
                attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                attributes["color"] = TEXT_SECONDARY_COLOR;
                return attributes;
            };
            KASFormDetailsModule.prototype.getViewMoreOrLessAttributes = function () {
                var attributes = {};
                attributes["padding"] = "4pt 0 0 0";
                attributes["font-size"] = UI.getScaledFontSize("12pt");
                attributes["font-weight"] = SEMIBOLD_FONT_WEIGHT;
                attributes["color"] = BLUE_COLOR;
                return attributes;
            };
            KASFormDetailsModule.prototype.getLikesCommentsCountAttributes = function () {
                var attributes = {};
                attributes["margin"] = "0 -12pt 0 -12pt"; // Should match the detail-module's padding
                attributes["padding"] = "0 12pt 0 12pt";
                attributes["height"] = "44pt";
                attributes["border-top"] = LINE_SEPARATOR_ATTRIBUTE;
                attributes["border-bottom"] = LINE_SEPARATOR_ATTRIBUTE;
                return attributes;
            };
            KASFormDetailsModule.prototype.getLikeIconAttributes = function () {
                var attributes = {};
                attributes["width"] = "16pt";
                attributes["height"] = "16pt";
                attributes["flex"] = "none";
                attributes["overflow"] = "hidden";
                return attributes;
            };
            KASFormDetailsModule.prototype.getCommentIconAttributes = function () {
                var attributes = {};
                attributes["width"] = "17pt";
                attributes["height"] = "15pt";
                attributes["flex"] = "none";
                attributes["overflow"] = "hidden";
                return attributes;
            };
            KASFormDetailsModule.prototype.getIconTitleAttributes = function () {
                var attributes = {};
                attributes["font-size"] = UI.getScaledFontSize("12pt");
                attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                attributes["color"] = TEXT_PRIMARY_COLOR;
                return attributes;
            };
            return KASFormDetailsModule;
        }());
        UI.KASFormDetailsModule = KASFormDetailsModule;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASFormEmptyModule = (function () {
            function KASFormEmptyModule() {
                this.icon = UI.Assets.emptyState;
                this.title = null;
                this.subtitle = null;
                this.actionTitle = null;
                this.action = null;
                this.subActionTitle = null;
                this.subAction = null;
                this.view = null;
            }
            KASFormEmptyModule.prototype.getView = function () {
                if (!this.view) {
                    var views = [];
                    if (this.icon) {
                        views.push(this.getIconDiv());
                        views.push(UI.getSpace("30pt"));
                    }
                    views.push(this.getTitleDiv());
                    views.push(this.getSubtitleDiv());
                    if (this.actionTitle) {
                        views.push(UI.getSpace("50pt"));
                        views.push(this.getActionDiv());
                    }
                    if (this.subActionTitle) {
                        views.push(UI.getSpace("20pt"));
                        views.push(this.getSubActionDiv());
                    }
                    this.view = UI.getVerticalDiv(views, this.getEmptyModuleAttributes());
                }
                return this.view;
            };
            KASFormEmptyModule.prototype.recreateView = function () {
                this.view = null;
                return this.getView();
            };
            KASFormEmptyModule.prototype.getIconDiv = function () {
                if (this.icon) {
                    return UI.getBase64Image(this.icon, this.getIconAttributes());
                }
                return null;
            };
            KASFormEmptyModule.prototype.getTitleDiv = function () {
                if (this.title) {
                    return UI.getLabel(this.title, this.getTitleAttributes());
                }
                return null;
            };
            KASFormEmptyModule.prototype.getSubtitleDiv = function () {
                if (this.subtitle) {
                    return UI.getLabel(this.subtitle, this.getSubtitleAttributes());
                }
                return null;
            };
            KASFormEmptyModule.prototype.getActionDiv = function () {
                if (this.actionTitle) {
                    var actionDiv = UI.getLabel(this.actionTitle, this.getActionAttributes());
                    UI.addClickEvent(actionDiv, this.action);
                    return actionDiv;
                }
                return null;
            };
            KASFormEmptyModule.prototype.getSubActionDiv = function () {
                if (this.subActionTitle) {
                    var subActionDiv = UI.getLabel(this.subActionTitle, this.getSubtitleAttributes());
                    UI.addClickEvent(subActionDiv, this.subAction);
                    return subActionDiv;
                }
                return null;
            };
            KASFormEmptyModule.prototype.getEmptyModuleAttributes = function () {
                var attributes = {};
                attributes["display"] = "flex";
                attributes["flex-direction"] = "column";
                attributes["justify-content"] = "center";
                attributes["align-items"] = "center";
                attributes["padding"] = "70pt 0 0 0";
                return attributes;
            };
            KASFormEmptyModule.prototype.getIconAttributes = function () {
                var attributes = {};
                attributes["width"] = "224pt";
                attributes["height"] = "170pt";
                return attributes;
            };
            KASFormEmptyModule.prototype.getTitleAttributes = function () {
                var attributes = {};
                attributes["text-align"] = "center";
                attributes["font-size"] = UI.getScaledFontSize("14pt");
                attributes["font-weight"] = SEMIBOLD_FONT_WEIGHT;
                attributes["color"] = "#6f7e8f";
                return attributes;
            };
            KASFormEmptyModule.prototype.getSubtitleAttributes = function () {
                var attributes = {};
                attributes["text-align"] = "center";
                attributes["font-size"] = UI.getScaledFontSize("10pt");
                attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                attributes["color"] = "#5c6a7c";
                return attributes;
            };
            KASFormEmptyModule.prototype.getActionAttributes = function () {
                var attributes = {};
                attributes["text-align"] = "center";
                attributes["font-size"] = UI.getScaledFontSize("14pt");
                attributes["font-weight"] = SEMIBOLD_FONT_WEIGHT;
                attributes["color"] = BLUE_COLOR;
                return attributes;
            };
            return KASFormEmptyModule;
        }());
        UI.KASFormEmptyModule = KASFormEmptyModule;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
/// <reference path="./KASFormRowsModule.ts" />
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASFormTitleSubtitleActionModule = (function (_super) {
            __extends(KASFormTitleSubtitleActionModule, _super);
            function KASFormTitleSubtitleActionModule() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.showIndex = false;
                _this.titles = null;
                _this.subtitles = null;
                _this.plainTextSubtitle = true;
                _this.titleColors = null;
                _this.boldTitle = true;
                _this.subtitlePrimary = false;
                return _this;
            }
            KASFormTitleSubtitleActionModule.prototype.getNumberOfRows = function () {
                if (this.titles == null) {
                    return 0;
                }
                return this.titles.length;
            };
            KASFormTitleSubtitleActionModule.prototype.getRowView = function (i) {
                if (i == 0) {
                    this.allTitleLabels = {};
                    this.allSubtitleLabels = {};
                }
                var indexLabel = null;
                if (this.showIndex) {
                    indexLabel = UI.getLabel((i + 1) + ".", this.getIndexAttributes(i));
                }
                var rowItems = [];
                var titleLabel = UI.getLabel(this.titles[i], this.getTitleAttributes(i));
                rowItems.push(titleLabel);
                this.allTitleLabels[i] = titleLabel;
                if (this.subtitles && this.subtitles.length > i && this.subtitles[i]) {
                    var subtitleLabel;
                    if (!this.plainTextSubtitle && KASClient.isLocation(this.subtitles[i])) {
                        subtitleLabel = UI.getLabel(KASClient.getLocationName(this.subtitles[i]), this.getSubtitleAttributes(i));
                    }
                    else if (!this.plainTextSubtitle && KASClient.isURL(this.subtitles[i])) {
                        subtitleLabel = UI.getImage(this.subtitles[i], this.getSubtitleImageAttributes(i));
                        subtitleLabel.onclick = function () {
                            KASClient.App.showImageImmersiveView([this.src]);
                        };
                    }
                    else {
                        subtitleLabel = UI.getLabel(this.subtitles[i], this.getSubtitleAttributes(i));
                    }
                    rowItems.push(subtitleLabel);
                    this.allSubtitleLabels[i] = subtitleLabel;
                }
                var rowView = UI.getHorizontalDiv([indexLabel, UI.getVerticalDiv(rowItems, UI.getCoverRestOfTheSpaceAttributes())]);
                return rowView;
            };
            KASFormTitleSubtitleActionModule.prototype.setTitleLabelForIndex = function (index, title) {
                if (title === void 0) { title = ""; }
                if (index < this.titles.length) {
                    this.titles[index] = title;
                    UI.setText(this.allTitleLabels[index], this.titles[index]);
                }
            };
            KASFormTitleSubtitleActionModule.prototype.setSubtitleForIndex = function (index, subtitle) {
                if (subtitle === void 0) { subtitle = ""; }
                if (index < this.subtitles.length) {
                    this.subtitles[index] = subtitle;
                    if (!this.plainTextSubtitle && KASClient.isLocation(this.subtitles[index])) {
                        UI.setText(this.allSubtitleLabels[index], this.subtitles[index]);
                    }
                    else if (!this.plainTextSubtitle && KASClient.isURL(this.subtitles[index])) {
                        this.allSubtitleLabels[index].src = this.subtitles[index];
                    }
                    else {
                        UI.setText(this.allSubtitleLabels[index], this.subtitles[index]);
                    }
                }
            };
            KASFormTitleSubtitleActionModule.prototype.getIndexAttributes = function (i) {
                var attributes = {};
                attributes["width"] = "25pt";
                attributes["text-align"] = "left";
                attributes["flex"] = "none";
                attributes["align-self"] = "flex-start";
                attributes["overflow"] = "hidden";
                attributes["font-size"] = UI.getScaledFontSize("14pt");
                attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                attributes["color"] = TEXT_PRIMARY_COLOR;
                return attributes;
            };
            KASFormTitleSubtitleActionModule.prototype.getTitleAttributes = function (i) {
                var attributes = {};
                if (this.subtitlePrimary) {
                    attributes["font-size"] = UI.getScaledFontSize("10pt");
                    attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                }
                else {
                    attributes["font-size"] = UI.getScaledFontSize("12pt");
                    if (this.boldTitle) {
                        attributes["font-weight"] = SEMIBOLD_FONT_WEIGHT;
                    }
                    else {
                        attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                    }
                }
                if (this.titleColors && this.titleColors.length > i && this.titleColors[i]) {
                    attributes["color"] = this.titleColors[i];
                }
                else {
                    attributes["color"] = TEXT_PRIMARY_COLOR;
                }
                return attributes;
            };
            KASFormTitleSubtitleActionModule.prototype.getSubtitleAttributes = function (i) {
                var attributes = {};
                if (this.subtitlePrimary) {
                    attributes["padding-top"] = "4pt";
                    attributes["font-size"] = UI.getScaledFontSize("12pt");
                    attributes["font-weight"] = SEMIBOLD_FONT_WEIGHT;
                    attributes["color"] = TEXT_PRIMARY_COLOR;
                }
                else {
                    if (KASClient.getPlatform() == KASClient.Platform.Android) {
                        attributes["padding-top"] = "2pt";
                    }
                    attributes["font-size"] = UI.getScaledFontSize("10pt");
                    attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                    attributes["color"] = TEXT_SECONDARY_COLOR;
                }
                return attributes;
            };
            KASFormTitleSubtitleActionModule.prototype.getSubtitleImageAttributes = function (i) {
                var attributes = {};
                attributes["margin-top"] = "10pt";
                attributes["height"] = "100pt";
                attributes["width"] = "100pt";
                return attributes;
            };
            return KASFormTitleSubtitleActionModule;
        }(UI.KASFormRowsModule));
        UI.KASFormTitleSubtitleActionModule = KASFormTitleSubtitleActionModule;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
/// <reference path="./KASFormTitleSubtitleActionModule.ts" />
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASFormImageTitleSubtitleActionModule = (function (_super) {
            __extends(KASFormImageTitleSubtitleActionModule, _super);
            function KASFormImageTitleSubtitleActionModule() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.imageUrl = null;
                _this.footerText = null;
                _this.imageAttributes = null;
                _this.footerTextAttributes = null;
                return _this;
            }
            KASFormImageTitleSubtitleActionModule.prototype.getNumberOfRows = function () {
                if (this.titles == null) {
                    return 0;
                }
                return this.titles.length;
            };
            KASFormImageTitleSubtitleActionModule.prototype.getRowView = function (i) {
                var image = null;
                if (this.imageUrl != null && this.imageUrl[i] != null) {
                    image = UI.getImage(this.imageUrl[i], Object.assign(this.getImageAttributes(i), this.imageAttributes));
                    image.onerror = function (event) {
                        KASClient.UI.addCSS(event.target, { "display": "none" });
                    };
                }
                var footer = null;
                if (this.footerText != null && this.footerText[i] != null) {
                    footer = UI.getLabel(this.footerText[i], Object.assign(this.getModuleFooterAttributes(i), this.footerTextAttributes));
                }
                return UI.getVerticalDiv([UI.getHorizontalDiv([image, this.getSpaceAttributes(), _super.prototype.getRowView.call(this, i)], this.getRowWithImageAttributes()), footer]);
            };
            KASFormImageTitleSubtitleActionModule.prototype.getImageAttributes = function (i) {
                var attributes = {};
                attributes["width"] = "36pt";
                attributes["height"] = "auto";
                attributes["overflow"] = "none";
                attributes["object-fit"] = "contain";
                return attributes;
            };
            KASFormImageTitleSubtitleActionModule.prototype.getModuleFooterAttributes = function (i) {
                var attributes = {};
                if (KASClient.getPlatform() == KASClient.Platform.Android) {
                    attributes["padding-top"] = "2pt";
                }
                attributes["margin-top"] = "5pt";
                attributes["font-size"] = UI.getScaledFontSize("10pt");
                attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                attributes["color"] = TEXT_SECONDARY_COLOR;
                return attributes;
            };
            KASFormImageTitleSubtitleActionModule.prototype.getSpaceAttributes = function () {
                return UI.getSpace("2pt");
            };
            KASFormImageTitleSubtitleActionModule.prototype.getRowWithImageAttributes = function () {
                var attributes = {};
                attributes["justify-content"] = "flex-start";
                return attributes;
            };
            return KASFormImageTitleSubtitleActionModule;
        }(UI.KASFormTitleSubtitleActionModule));
        UI.KASFormImageTitleSubtitleActionModule = KASFormImageTitleSubtitleActionModule;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASFormModuleContainer = (function () {
            function KASFormModuleContainer() {
                this.navigationBarHidden = false;
                this.bottomBarHidden = false;
                this.backgroundColor = PAGE_BG_COLOR;
                this.attributes = null;
                this.view = null;
            }
            KASFormModuleContainer.prototype.getView = function () {
                if (this.view == null) {
                    this.view = UI.getDiv(this.getModuleContainerAttributes());
                }
                return this.view;
            };
            KASFormModuleContainer.prototype.addModule = function (module) {
                if (module.fillParent) {
                    UI.addCSS(module.getView(), this.getNoPaddingModuleAttribute());
                }
                UI.addElement(module.getView(), this.getView());
            };
            KASFormModuleContainer.prototype.addModuleWithFullWidth = function (module) {
                module.disableShadow = true;
                module.fillParent = true;
                UI.addCSS(module.getView(), this.getNoPaddingModuleAttribute());
                UI.addElement(module.getView(), this.getView());
            };
            KASFormModuleContainer.prototype.addView = function (childView) {
                UI.addElement(childView, this.getView());
            };
            KASFormModuleContainer.prototype.addViewWithFullWidth = function (childView) {
                UI.addCSS(childView, this.getNoPaddingModuleAttribute());
                UI.addElement(childView, this.getView());
            };
            KASFormModuleContainer.prototype.removeModule = function (module) {
                UI.removeElement(module.getView(), this.getView());
            };
            KASFormModuleContainer.prototype.removeAllModules = function () {
                UI.clearElement(this.view);
            };
            KASFormModuleContainer.prototype.refreshModule = function (module) {
                var oldModuleView = module.getView();
                var newModuleView = module.recreateView();
                if (module.fillParent) {
                    UI.addCSS(newModuleView, this.getNoPaddingModuleAttribute());
                }
                UI.replaceElement(newModuleView, oldModuleView, this.getView());
            };
            KASFormModuleContainer.prototype.setBodyBackgroundColor = function () {
                document.body.style.backgroundColor = this.backgroundColor;
            };
            KASFormModuleContainer.prototype.getModuleContainerAttributes = function () {
                var attributes = {};
                if (!this.navigationBarHidden) {
                    if (KASClient.getPlatform() == KASClient.Platform.iOS) {
                        attributes["margin-top"] = NAVIGATION_BAR_HEIGHT_IOS;
                    }
                    else {
                        attributes["margin-top"] = NAVIGATION_BAR_HEIGHT_ANDROID;
                    }
                }
                if (!this.bottomBarHidden) {
                    attributes["margin-bottom"] = BOTTOM_BAR_HEIGHT;
                }
                attributes["background-color"] = CLEAR_COLOR;
                attributes["padding"] = MODULE_GAP;
                attributes["display"] = "flex";
                attributes["flex"] = "1 1 auto";
                attributes["flex-direction"] = "column";
                return Object.assign(attributes, this.attributes);
            };
            KASFormModuleContainer.prototype.getNoPaddingModuleAttribute = function () {
                var attributes = {};
                attributes["margin"] = "0 -4pt 4pt -4pt";
                return attributes;
            };
            return KASFormModuleContainer;
        }());
        UI.KASFormModuleContainer = KASFormModuleContainer;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASFormPage = (function () {
            function KASFormPage() {
                this.navigationBar = new UI.KASFormPageNavigationBar();
                this.moduleContainer = new UI.KASFormModuleContainer();
                this.bottomBar = new UI.KASFormPageBottomBar();
                this.pageWillAppearCallback = null;
                this.pageWillDisappearCallback = null;
                this.view = null;
            }
            KASFormPage.prototype.getView = function () {
                if (this.view == null) {
                    var views = [];
                    if (!KASFormPage.hideNavigationBar) {
                        var navigationBarDiv = this.navigationBar.getView();
                        views.push(navigationBarDiv);
                    }
                    this.moduleContainer.navigationBarHidden = KASFormPage.hideNavigationBar;
                    this.moduleContainer.bottomBarHidden = !(this.shouldShowBottomBar());
                    var moduleContainerDiv = this.moduleContainer.getView();
                    views.push(moduleContainerDiv);
                    if (this.shouldShowBottomBar()) {
                        var bottomBarDiv = this.bottomBar.getView();
                        views.push(bottomBarDiv);
                    }
                    this.view = UI.getVerticalDiv(views, this.getPageAttributes());
                }
                return this.view;
            };
            KASFormPage.prototype.updateNavigationBar = function () {
                if (this.view && !KASFormPage.hideNavigationBar) {
                    var oldNavigationBarDiv = this.navigationBar.getView();
                    var newNavigationBarDiv = this.navigationBar.recreateView();
                    UI.replaceElement(newNavigationBarDiv, oldNavigationBarDiv, this.view);
                }
            };
            KASFormPage.prototype.shouldShowBottomBar = function () {
                return (this.bottomBar.elements && this.bottomBar.elements.length > 0);
            };
            KASFormPage.prototype.recreateView = function () {
                this.view = null;
                return this.getView();
            };
            KASFormPage.prototype.pageWillAppear = function () {
                this.moduleContainer.setBodyBackgroundColor();
                if (this.pageWillAppearCallback) {
                    this.pageWillAppearCallback();
                }
            };
            KASFormPage.prototype.pageWillDisappear = function () {
                if (this.pageWillDisappearCallback) {
                    this.pageWillDisappearCallback();
                }
            };
            KASFormPage.prototype.hidePage = function () {
                this.view.style.left = "calc(-" + this.view.style.width + ")";
                this.navigationBar.getView().style.position = "absolute";
                this.bottomBar.getView().style.position = "absolute";
                this.view.setAttribute(UI.KASFormAccessibilityKey.Hidden, "true");
            };
            KASFormPage.prototype.showPage = function () {
                this.view.style.left = "0";
                this.navigationBar.getView().style.position = "fixed";
                this.bottomBar.getView().style.position = "fixed";
                KASClient.Internal.screenChanged(this.navigationBar.title);
                this.view.removeAttribute(UI.KASFormAccessibilityKey.Hidden);
            };
            KASFormPage.prototype.getPageAttributes = function () {
                var attributes = {};
                attributes["position"] = "absolute";
                attributes["width"] = "100%";
                attributes["margin"] = "0";
                attributes["padding"] = "0";
                attributes["background-color"] = CLEAR_COLOR;
                attributes["display"] = "flex";
                attributes["flex"] = "1 1 auto";
                attributes["flex-direction"] = "column";
                attributes["-webkit-touch-callout"] = "none";
                attributes["-moz-user-select"] = "none";
                attributes["-webkit-user-select"] = "none";
                attributes["-ms-user-select"] = "none";
                attributes["-webkit-tap-highlight-color"] = CLEAR_COLOR;
                return attributes;
            };
            KASFormPage.hideNavigationBar = false;
            return KASFormPage;
        }());
        UI.KASFormPage = KASFormPage;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASFormPageBottomBar = (function () {
            function KASFormPageBottomBar() {
                this.elements = [];
                this.attributes = null;
                this.view = null;
            }
            KASFormPageBottomBar.prototype.getView = function () {
                if (this.view == null) {
                    this.view = UI.getHorizontalDiv(this.elements, this.getBottomBarAttributes());
                }
                return this.view;
            };
            KASFormPageBottomBar.prototype.recreateView = function () {
                this.view = null;
                return this.getView();
            };
            KASFormPageBottomBar.prototype.getBottomBarAttributes = function () {
                var attributes = {};
                attributes["position"] = "fixed";
                attributes["left"] = "0";
                attributes["right"] = "0";
                attributes["bottom"] = "0";
                attributes["height"] = BOTTOM_BAR_HEIGHT;
                attributes["z-index"] = 1;
                attributes["background-color"] = "white";
                attributes["box-shadow"] = "0pt 2pt 4pt " + SHADOW_COLOR;
                attributes["font-size"] = UI.getScaledFontSize("12pt");
                attributes["font-weight"] = SEMIBOLD_FONT_WEIGHT;
                attributes["color"] = BLUE_COLOR;
                return Object.assign(attributes, this.attributes);
            };
            return KASFormPageBottomBar;
        }());
        UI.KASFormPageBottomBar = KASFormPageBottomBar;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASFormPageNavigationBar = (function () {
            function KASFormPageNavigationBar() {
                this.backAsset = null;
                this.backAction = null;
                this.backAccessibilityLabel = null; // For Accessibility text
                this.iconPath = null;
                this.iconView = null;
                this.title = null;
                this.subtitle = null;
                //// Deprecated Now : Use rightButtonElements instead ////
                this.rightButtonTitle = null;
                this.rightButtonAction = null;
                ////////////////////////////////////////////////////
                this.rightButtonElements = [];
                this.attributes = null;
                // For debugging
                this.titleAction = null;
                this.subtitleDiv = null;
                this.titleDiv = null;
                this.view = null;
            }
            KASFormPageNavigationBar.prototype.getView = function () {
                if (this.view == null) {
                    var backIcon = null;
                    if (this.backAsset == null) {
                        var image = ((KASClient.getPlatform() == KASClient.Platform.iOS) ? UI.Assets.navigationBackiOS : UI.Assets.navigationBackAndroid);
                        backIcon = UI.getBase64Image(image, this.getBackIconAttributes());
                    }
                    else {
                        backIcon = UI.getImage(this.backAsset, this.getBackIconAttributes());
                    }
                    var backIconDiv = UI.getHorizontalDiv([backIcon], this.getBackIconContainerAttributes());
                    UI.setAccessibilityBasic(backIconDiv, false, UI.KASFormAccessibilityRole.Button, this.backAccessibilityLabel ? this.backAccessibilityLabel : KASClient.Internal.getKASClientString("KASFormPageBackIcon"));
                    UI.addClickEvent(backIconDiv, this.backAction);
                    var iconDiv = null;
                    if (this.iconPath) {
                        iconDiv = UI.getImage(this.iconPath, this.getIconAttributes());
                        UI.setAccessibilityAttribute(iconDiv, UI.KASFormAccessibilityKey.Hidden, "true");
                    }
                    else if (this.iconView) {
                        UI.addCSS(this.iconView, this.getIconAttributes());
                        iconDiv = this.iconView;
                        UI.setAccessibilityAttribute(iconDiv, UI.KASFormAccessibilityKey.Hidden, "true");
                    }
                    if (this.title) {
                        this.titleDiv = UI.getLabel(this.title, this.getTitleAttributes());
                        UI.setAccessibilityBasic(this.titleDiv, false, UI.KASFormAccessibilityRole.Text);
                        UI.addClickEvent(this.titleDiv, this.titleAction);
                    }
                    if (this.subtitle) {
                        this.subtitleDiv = UI.getLabel(this.subtitle, this.getSubtitleAttributes());
                        UI.setAccessibilityBasic(this.subtitleDiv, false, UI.KASFormAccessibilityRole.Text);
                    }
                    else {
                        this.subtitleDiv = null;
                    }
                    var rightButton = null;
                    if (this.rightButtonTitle != null) {
                        rightButton = UI.getLabel(this.rightButtonTitle, this.getRightButtonAttributes());
                        UI.setAccessibilityBasic(rightButton, false, UI.KASFormAccessibilityRole.Button);
                        UI.addClickEvent(rightButton, this.rightButtonAction);
                    }
                    if (rightButton != null) {
                        this.rightButtonElements = [rightButton];
                    }
                    var titleSubtitleDiv = UI.getVerticalDiv([this.titleDiv, this.subtitleDiv], this.getTitleSubtitleAttributes());
                    this.view = UI.getHorizontalDiv([backIconDiv, iconDiv, UI.getSpace("8pt"), titleSubtitleDiv, UI.getFlexibleSpace()].concat(this.rightButtonElements), this.getNavigationBarAttributes());
                }
                return this.view;
            };
            KASFormPageNavigationBar.prototype.getTitle = function () {
                if (this.titleDiv != null) {
                    return this.titleDiv.innerText;
                }
            };
            KASFormPageNavigationBar.prototype.recreateView = function () {
                this.view = null;
                return this.getView();
            };
            KASFormPageNavigationBar.prototype.updateSubtitle = function () {
                if (this.subtitleDiv) {
                    UI.setText(this.subtitleDiv, this.subtitle);
                }
                // Else view is not yet inflated
            };
            KASFormPageNavigationBar.prototype.updateTitle = function () {
                if (this.titleDiv) {
                    UI.setText(this.titleDiv, this.title);
                }
                // Else view is not yet inflated
            };
            KASFormPageNavigationBar.prototype.getNavigationBarAttributes = function () {
                var attributes = {};
                attributes["position"] = "fixed";
                attributes["top"] = "0";
                attributes["left"] = "0";
                attributes["right"] = "0";
                attributes["padding-bottom"] = (5.0 / iOSFontSizeScaleMultiplier) + "pt";
                attributes["align-items"] = "flex-end";
                if (KASClient.getPlatform() == KASClient.Platform.iOS) {
                    attributes["height"] = NAVIGATION_BAR_HEIGHT_IOS;
                }
                else {
                    attributes["height"] = NAVIGATION_BAR_HEIGHT_ANDROID;
                }
                attributes["z-index"] = 1;
                attributes["background-color"] = "white";
                attributes["box-shadow"] = "0pt 2pt 4pt 1pt " + SHADOW_COLOR;
                return Object.assign(attributes, this.attributes);
            };
            KASFormPageNavigationBar.prototype.getBackIconAttributes = function () {
                var attributes = {};
                if (KASClient.getPlatform() == KASClient.Platform.iOS) {
                    attributes["width"] = "10pt";
                    attributes["height"] = "16pt";
                }
                else {
                    attributes["width"] = "11.5pt";
                    attributes["height"] = "11.5pt";
                }
                attributes["object-fit"] = "contain";
                return attributes;
            };
            KASFormPageNavigationBar.prototype.getBackIconContainerAttributes = function () {
                var attributes = {};
                if (KASClient.getPlatform() == KASClient.Platform.iOS) {
                    attributes["padding"] = "6pt 14pt 6pt 9pt";
                }
                else {
                    attributes["padding"] = "8.125pt 12pt 8.125pt 14pt";
                }
                return attributes;
            };
            KASFormPageNavigationBar.prototype.getIconAttributes = function () {
                var attributes = {};
                attributes["height"] = "28pt";
                attributes["width"] = "28pt";
                attributes["flex"] = "none";
                return attributes;
            };
            KASFormPageNavigationBar.prototype.getTitleSubtitleAttributes = function () {
                var attributes = {};
                attributes["overflow"] = "hidden";
                return attributes;
            };
            KASFormPageNavigationBar.prototype.getTitleAttributes = function () {
                var attributes = {};
                if (this.subtitle && this.subtitle != "") {
                    attributes["font-size"] = UI.getScaledFontSize("12pt");
                }
                else {
                    attributes["font-size"] = UI.getScaledFontSize("14pt");
                    attributes["padding-bottom"] = (5 / iOSFontSizeScaleMultiplier) + "pt";
                }
                attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                attributes["color"] = TEXT_PRIMARY_COLOR;
                attributes["max-width"] = "210pt";
                attributes["white-space"] = "nowrap";
                attributes["overflow"] = "hidden";
                attributes["text-overflow"] = "ellipsis";
                return attributes;
            };
            KASFormPageNavigationBar.prototype.getSubtitleAttributes = function () {
                var attributes = {};
                if (KASClient.getPlatform() == KASClient.Platform.Android) {
                    attributes["padding-top"] = "2pt";
                }
                attributes["font-size"] = UI.getScaledFontSize("10pt");
                attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                attributes["color"] = TEXT_SECONDARY_COLOR;
                attributes["max-width"] = "200pt";
                attributes["white-space"] = "nowrap";
                attributes["overflow"] = "hidden";
                attributes["text-overflow"] = "ellipsis";
                return attributes;
            };
            KASFormPageNavigationBar.prototype.getRightButtonAttributes = function () {
                var attributes = {};
                attributes["font-size"] = UI.getScaledFontSize("14pt");
                attributes["padding-bottom"] = "5pt";
                attributes["padding-right"] = "8pt";
                attributes["padding-left"] = "8pt";
                attributes["font-weight"] = MEDIUM_FONT_WEIGHT;
                attributes["color"] = BLUE_COLOR;
                attributes["max-width"] = "210pt";
                attributes["white-space"] = "nowrap";
                attributes["overflow"] = "hidden";
                attributes["text-overflow"] = "ellipsis";
                return attributes;
            };
            return KASFormPageNavigationBar;
        }());
        UI.KASFormPageNavigationBar = KASFormPageNavigationBar;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASFormPageNavigator = (function () {
            function KASFormPageNavigator() {
                this.dismissAction = null;
                this.navigationStack = [];
                this.navigationScrollPositions = [];
                this.view = null;
            }
            KASFormPageNavigator.prototype.getView = function () {
                var _this = this;
                if (this.view == null) {
                    this.view = UI.getDiv(this.getPageNavigatorAttributes());
                    // For going back to Conversation
                    this.dismissAction = function () {
                        KASClient.App.dismissCurrentScreen();
                    };
                    // Below is required to handle hardware backpress event in Android
                    KASClient.App.registerHardwareBackPressCallback(function () {
                        var currentTopPage = _this.navigationStack[_this.navigationStack.length - 1];
                        if (currentTopPage.navigationBar.backAction != null)
                            currentTopPage.navigationBar.backAction();
                        else
                            _this.goBack();
                    });
                }
                return this.view;
            };
            KASFormPageNavigator.prototype.containsPages = function () {
                return (this.navigationStack.length > 0);
            };
            KASFormPageNavigator.prototype.pushPage = function (page) {
                if (this.navigationStack.length > 0) {
                    var currentTopPage = this.navigationStack[this.navigationStack.length - 1];
                    var currentScrollPosition = (document.documentElement.scrollTop || document.body.scrollTop);
                    this.navigationScrollPositions.push(currentScrollPosition);
                    currentTopPage.pageWillDisappear();
                    currentTopPage.hidePage();
                }
                if (page.navigationBar.backAction == null)
                    page.navigationBar.backAction = this.goBack.bind(this);
                this.navigationStack.push(page);
                page.pageWillAppear();
                UI.addElement(page.getView(), this.view);
                document.documentElement.scrollTop = document.body.scrollTop = 0;
                KASClient.Internal.screenChanged(page.navigationBar.getTitle());
            };
            KASFormPageNavigator.prototype.popPage = function () {
                if (this.navigationStack.length == 0) {
                    if (this.dismissAction) {
                        this.dismissAction();
                    }
                    return;
                }
                var poppedPage = this.navigationStack.pop();
                poppedPage.pageWillDisappear();
                if (this.navigationStack.length > 0) {
                    var currentTopPage = this.navigationStack[this.navigationStack.length - 1];
                    currentTopPage.pageWillAppear();
                    currentTopPage.showPage();
                    var savedScrollPosition = this.navigationScrollPositions.pop();
                    document.documentElement.scrollTop = document.body.scrollTop = savedScrollPosition;
                    KASClient.Internal.screenChanged(currentTopPage.navigationBar.getTitle());
                }
                UI.removeElement(poppedPage.getView(), this.view);
            };
            KASFormPageNavigator.prototype.popAllPages = function () {
                for (var i = 0; i < this.navigationStack.length; i++) {
                    this.popPage();
                }
            };
            KASFormPageNavigator.prototype.goBack = function () {
                if (this.navigationStack.length > 1) {
                    this.popPage();
                }
                else if (this.dismissAction) {
                    this.dismissAction();
                }
            };
            KASFormPageNavigator.prototype.getPageNavigatorAttributes = function () {
                var attributes = {};
                return attributes;
            };
            return KASFormPageNavigator;
        }());
        UI.KASFormPageNavigator = KASFormPageNavigator;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASFormQuestionResponsesModule = (function () {
            function KASFormQuestionResponsesModule() {
                this.questionTitle = null;
                this.responsesHeader = null;
                this.questionType = KASClient.KASQuestionType.None;
                this.questionResult = null;
                this.optionSelectedAction = null;
                this.sumTitle = null;
                this.averageTitle = null;
                this.aggregationNotApplicableTitle = null;
                this.view = null;
            }
            KASFormQuestionResponsesModule.prototype.getView = function () {
                if (!this.view) {
                    this.view = UI.getVerticalDiv([this.getQuestionTitleRow(), this.getResponseHeaderRow(), this.getResponsesRow()], this.getQuestionDetailsAttributes());
                }
                return this.view;
            };
            KASFormQuestionResponsesModule.prototype.recreateView = function () {
                this.view = null;
                return this.getView();
            };
            KASFormQuestionResponsesModule.prototype.getQuestionTitleRow = function () {
                if (this.questionTitle != null) {
                    return UI.getLabel(this.questionTitle, this.getQuestionTitleAttributes());
                }
                else {
                    return null;
                }
            };
            KASFormQuestionResponsesModule.prototype.getResponseHeaderRow = function () {
                if (this.responsesHeader != null) {
                    return UI.getLabel(this.responsesHeader, this.getResponseHeaderAttributes());
                }
                else {
                    return null;
                }
            };
            KASFormQuestionResponsesModule.prototype.getResponsesRow = function () {
                if (this.questionType == KASClient.KASQuestionType.SingleSelect ||
                    this.questionType == KASClient.KASQuestionType.MultiSelect ||
                    this.questionType == KASClient.KASQuestionType.SingleSelectExternal) {
                    var optionQuestionResult = (this.questionResult);
                    var counts = [];
                    var titles = [];
                    for (var optionId in optionQuestionResult.optionResults) {
                        var optionResult = optionQuestionResult.optionResults[optionId];
                        counts.push(optionResult.totalResponsesCount);
                        titles.push(optionResult.optionTitle);
                    }
                    var optionCountModule = new UI.KASFormCountImageTitleActionModule();
                    optionCountModule.counts = counts;
                    optionCountModule.titles = titles;
                    optionCountModule.rowAction = this.optionSelectedAction;
                    optionCountModule.getView();
                    for (var i = 0; i < optionCountModule.titles.length; i++) {
                        optionCountModule.setAccessibilityAttribute(i, KASClient.UI.KASFormAccessibilityKey.Hidden, "false");
                        optionCountModule.setAccessibilityAttribute(i, KASClient.UI.KASFormAccessibilityKey.Role, KASClient.UI.KASFormAccessibilityRole.Button);
                        optionCountModule.setAccessibilityAttribute(i, KASClient.UI.KASFormAccessibilityKey.Label, optionCountModule.titles[i] + ". " + optionCountModule.counts[i]);
                    }
                    UI.addCSS(optionCountModule.contentView, this.getOptionCountModuleAttributes());
                    return optionCountModule.contentView;
                }
                else if (this.questionType == KASClient.KASQuestionType.Numeric) {
                    var numericQuestionResult = (this.questionResult);
                    var sum = KASClient.truncatedDecimalString(numericQuestionResult.sum);
                    var sumRow = this.getTitleCountRow(this.sumTitle, sum);
                    UI.setAccessibilityBasic(sumRow, false, UI.KASFormAccessibilityRole.Text, this.sumTitle + ". " + sum);
                    UI.addCSS(sumRow, this.getSumRowAttributes());
                    var avg = KASClient.truncatedDecimalString(numericQuestionResult.average);
                    var avgRow = this.getTitleCountRow(this.averageTitle, avg);
                    UI.setAccessibilityBasic(avgRow, false, UI.KASFormAccessibilityRole.Text, this.averageTitle + ". " + avg);
                    return UI.getVerticalDiv([sumRow, avgRow]);
                }
                else {
                    return UI.getLabel(this.aggregationNotApplicableTitle, this.getNumericResultsRowAttributes());
                }
            };
            KASFormQuestionResponsesModule.prototype.getTitleCountRow = function (title, count) {
                var titleDiv = UI.getLabel(title, this.getRowTitleAttributes());
                var countDiv = UI.getLabel(count, this.getRowCountAttributes());
                return UI.getHorizontalDiv([titleDiv, countDiv], this.getNumericResultsRowAttributes());
            };
            KASFormQuestionResponsesModule.prototype.getNumericResultsRowAttributes = function () {
                var attributes = UI.getCoverRestOfTheSpaceAttributes();
                attributes["padding"] = UI.getScaledFontSize("12pt");
                attributes["color"] = TEXT_PRIMARY_COLOR;
                return attributes;
            };
            KASFormQuestionResponsesModule.prototype.getSumRowAttributes = function () {
                var attributes = UI.getCoverRestOfTheSpaceAttributes();
                attributes["border-bottom"] = LINE_SEPARATOR_ATTRIBUTE;
                return attributes;
            };
            KASFormQuestionResponsesModule.prototype.getRowTitleAttributes = function () {
                var attributes = {};
                attributes["font-size"] = UI.getScaledFontSize("12pt");
                attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                attributes["color"] = TEXT_PRIMARY_COLOR;
                return attributes;
            };
            KASFormQuestionResponsesModule.prototype.getRowCountAttributes = function () {
                var attributes = {};
                attributes["font-size"] = UI.getScaledFontSize("12pt");
                attributes["font-weight"] = SEMIBOLD_FONT_WEIGHT;
                attributes["color"] = TEXT_PRIMARY_COLOR;
                return attributes;
            };
            KASFormQuestionResponsesModule.prototype.getQuestionDetailsAttributes = function () {
                var attributes = {};
                attributes["background-color"] = "rgb(255, 255, 255)";
                attributes["display"] = "flex";
                attributes["flex-direction"] = "column";
                attributes["flex"] = "1";
                return attributes;
            };
            KASFormQuestionResponsesModule.prototype.getQuestionTitleAttributes = function () {
                var attributes = {};
                attributes["padding"] = "12pt 12pt 32pt 12pt";
                attributes["font-size"] = UI.getScaledFontSize("12pt");
                attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                attributes["color"] = TEXT_PRIMARY_COLOR;
                return attributes;
            };
            KASFormQuestionResponsesModule.prototype.getResponseHeaderAttributes = function () {
                var attributes = {};
                attributes["padding"] = "12pt";
                attributes["border-top"] = LINE_SEPARATOR_ATTRIBUTE;
                attributes["font-size"] = UI.getScaledFontSize("10pt");
                attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                attributes["color"] = TEXT_SECONDARY_COLOR;
                return attributes;
            };
            KASFormQuestionResponsesModule.prototype.getOptionCountModuleAttributes = function () {
                var attributes = UI.getCoverRestOfTheSpaceAttributes();
                return attributes;
            };
            return KASFormQuestionResponsesModule;
        }());
        UI.KASFormQuestionResponsesModule = KASFormQuestionResponsesModule;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
/// <reference path="./KASFormImageTitleSubtitleActionModule.ts" />
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASFormTimelineModule = (function (_super) {
            __extends(KASFormTimelineModule, _super);
            function KASFormTimelineModule() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            KASFormTimelineModule.prototype.getModuleAttributes = function () {
                var attributes = {};
                attributes["margin"] = "8pt 5pt 8pt 15pt";
                attributes["border-radius"] = "0";
                attributes["position"] = "relative";
                return Object.assign(attributes, this.attributes);
            };
            KASFormTimelineModule.prototype.getRowAttributes = function (i) {
                var attributes = {};
                attributes["padding"] = "0pt 12pt 0pt 12pt";
                if (this.getNumberOfRows() > i + 1) {
                    attributes["border-left"] = "1pt dashed #98a3af";
                }
                attributes["height"] = "45pt";
                return attributes;
            };
            KASFormTimelineModule.prototype.getRowWithImageAttributes = function () {
                var attributes = {};
                attributes["justify-content"] = "flex-start";
                attributes["align-items"] = "flex-start";
                return attributes;
            };
            KASFormTimelineModule.prototype.getSpaceAttributes = function () {
                return UI.getSpace("8pt");
            };
            KASFormTimelineModule.prototype.getImageAttributes = function (i) {
                var attributes = {};
                attributes["width"] = "12pt";
                attributes["height"] = "auto";
                attributes["overflow"] = "none";
                attributes["object-fit"] = "contain";
                attributes["margin-left"] = "-18pt";
                return attributes;
            };
            KASFormTimelineModule.prototype.getTitleAttributes = function (i) {
                var attributes = {};
                attributes["font-size"] = UI.getScaledFontSize("10pt");
                attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                attributes["color"] = "#6f7e8f";
                return attributes;
            };
            KASFormTimelineModule.prototype.getSubtitleAttributes = function (i) {
                var attributes = {};
                attributes["font-size"] = UI.getScaledFontSize("12pt");
                attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                attributes["color"] = "#26374c";
                attributes["padding-bottom"] = "10pt";
                return attributes;
            };
            return KASFormTimelineModule;
        }(UI.KASFormImageTitleSubtitleActionModule));
        UI.KASFormTimelineModule = KASFormTimelineModule;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
/// <reference path="./KASFormRowsModule.ts" />
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASFormUserTitleSubtitleActionModule = (function (_super) {
            __extends(KASFormUserTitleSubtitleActionModule, _super);
            function KASFormUserTitleSubtitleActionModule() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.users = null;
                _this.titles = null;
                _this.subtitles = null;
                return _this;
            }
            KASFormUserTitleSubtitleActionModule.prototype.getNumberOfRows = function () {
                if (this.users == null) {
                    return 0;
                }
                return this.users.length;
            };
            KASFormUserTitleSubtitleActionModule.prototype.getRowView = function (i) {
                var profilePicDiv = UI.getProfilePic(this.users[i]);
                UI.setAccessibilityAttribute(profilePicDiv, UI.KASFormAccessibilityKey.Hidden, "true");
                var rowItems = [];
                var profileNameDiv = UI.getLabel(this.users[i].name, this.getUserNameAttributes(i));
                rowItems.push(profileNameDiv);
                if (this.titles && this.titles.length > i && this.titles[i]) {
                    var titleLabel = UI.getLabel(this.titles[i], this.getTitleAttributes(i));
                    rowItems.push(titleLabel);
                }
                if (this.subtitles && this.subtitles.length > i && this.subtitles[i]) {
                    var subtitleLabel = UI.getLabel(this.subtitles[i], this.getSubtitleAttributes(i));
                    rowItems.push(subtitleLabel);
                }
                var textDiv = UI.getVerticalDiv(rowItems, UI.getCoverRestOfTheSpaceAttributes());
                return UI.getHorizontalDiv([profilePicDiv, UI.getSpace(), textDiv]);
            };
            KASFormUserTitleSubtitleActionModule.prototype.getUserNameAttributes = function (i) {
                var attributes = {};
                if (this.subtitles && this.subtitles.length > 0) {
                    attributes["font-size"] = UI.getScaledFontSize("10pt");
                    attributes["font-weight"] = MEDIUM_FONT_WEIGHT;
                    attributes["color"] = TEXT_PRIMARY_COLOR;
                }
                else {
                    attributes["font-size"] = UI.getScaledFontSize("12pt");
                    attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                    attributes["color"] = TEXT_PRIMARY_COLOR;
                }
                return attributes;
            };
            KASFormUserTitleSubtitleActionModule.prototype.getTitleAttributes = function (i) {
                var attributes = {};
                if (this.subtitles && this.subtitles.length > 0) {
                    attributes["font-size"] = UI.getScaledFontSize("12pt");
                    attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                    attributes["color"] = TEXT_PRIMARY_COLOR;
                }
                else {
                    attributes["font-size"] = UI.getScaledFontSize("10pt");
                    attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                    attributes["color"] = TEXT_SECONDARY_COLOR;
                }
                return attributes;
            };
            KASFormUserTitleSubtitleActionModule.prototype.getSubtitleAttributes = function (i) {
                var attributes = {};
                attributes["font-size"] = UI.getScaledFontSize("10pt");
                attributes["font-weight"] = REGULAR_FONT_WEIGHT;
                attributes["color"] = TEXT_SECONDARY_COLOR;
                return attributes;
            };
            return KASFormUserTitleSubtitleActionModule;
        }(UI.KASFormRowsModule));
        UI.KASFormUserTitleSubtitleActionModule = KASFormUserTitleSubtitleActionModule;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
// Constants
var NAVIGATION_BAR_HEIGHT_IOS = "44pt";
var NAVIGATION_BAR_HEIGHT_ANDROID = "36pt";
var BOTTOM_BAR_HEIGHT = "44pt";
var MODULE_GAP = "4pt";
var DEFAULT_SPACE_LENGTH = "10pt";
var DEFAULT_IMAGE_DIMEN = "50pt";
var BLUE_COLOR = "rgb(0, 111, 241)";
var LIGHT_BLUE_COLOR = "rgb(0, 161, 255)";
var RED_COLOR = "rgb(208, 2, 27)";
var LIGHT_RED_COLOR = "rgb(222, 45, 79)";
var LINE_SEPARATOR_ATTRIBUTE = "0.5pt solid #d4d8db";
var PAGE_BG_COLOR = "#f1f2f4";
var SHADOW_COLOR = "rgba(0, 0, 0, 0.1)";
var CLEAR_COLOR = "rgba(0, 0, 0, 0)";
var TEXT_PRIMARY_COLOR = "rgb(50, 72, 95)";
var TEXT_SECONDARY_COLOR = "rgb(102, 119, 135)";
var REGULAR_FONT_WEIGHT = "normal";
var MEDIUM_FONT_WEIGHT = "500";
var SEMIBOLD_FONT_WEIGHT = "600";
var iOSFontSizeScaleMultiplier = 1.0;
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        /////////////////////////////////////////////////
        ////////////// INCOMPATIBLE SCREEN //////////////
        /////////////////////////////////////////////////
        function showIncompatibleScreen() {
            // If progress bar is shown, hide it first
            if (KASClient.Version.clientSupports(KASClient.Version.VERSION_1)) {
                KASClient.App.hideProgressBar();
            }
            var incompatibleModule = new UI.KASFormEmptyModule();
            incompatibleModule.title = KASClient.Internal.getKASClientString("KASFormErrorTitle");
            incompatibleModule.subtitle = KASClient.Internal.getKASClientString("KASFormErrorSubTitle");
            var dismissScreen = function () {
                if (KASClient.Version.clientSupports(KASClient.Version.VERSION_1)) {
                    KASClient.App.dismissCurrentScreen();
                }
                else if (KASClient.getPlatform() == KASClient.Platform.iOS) {
                    // Submit a dummy response against a dummy id which will dismiss the screen
                    // without adding that response
                    KASClient.Form.sumbitFormResponse(JSON.parse("{}"), "DUMMY_ID", true, false, false);
                }
            };
            if (KASClient.Version.clientSupports(KASClient.Version.VERSION_3)) {
                incompatibleModule.actionTitle = KASClient.Internal.getKASClientString("KASFormErrorUpgradeAction");
                incompatibleModule.action = function () {
                    KASClient.openStoreLink();
                };
                incompatibleModule.subActionTitle = KASClient.Internal.getKASClientString("KASFormErrorNotNowAction");
                incompatibleModule.subAction = function () {
                    dismissScreen();
                };
            }
            else {
                incompatibleModule.actionTitle = KASClient.Internal.getKASClientString("KASFormErrorOkAction");
                incompatibleModule.action = function () {
                    dismissScreen();
                };
            }
            addCSS(document.body, { "background-color": "white" });
            clearElement(document.body);
            addElement(incompatibleModule.getView(), document.body);
        }
        UI.showIncompatibleScreen = showIncompatibleScreen;
        /////////////////// General Module Utility ///////////////////
        function getProfilePic(user, attributes) {
            if (attributes === void 0) { attributes = null; }
            var userProfilePicDiv = getLabel(user.pictureInitials, Object.assign(getDefaultProfilePicAttributes(user), attributes));
            if (user.pictureUrl && user.pictureUrl != "") {
                userProfilePicDiv = getCircularImage(user.pictureUrl, "30pt", attributes);
            }
            return userProfilePicDiv;
        }
        UI.getProfilePic = getProfilePic;
        function getDefaultProfilePicAttributes(user) {
            var attributes = {};
            attributes["border-radius"] = "50%";
            attributes["width"] = "30pt";
            attributes["height"] = "30pt";
            attributes["display"] = "flex";
            attributes["align-items"] = "center";
            attributes["justify-content"] = "center";
            attributes["background-color"] = BLUE_COLOR;
            if (user.pictureBGColor) {
                attributes["background-color"] = user.pictureBGColor;
            }
            attributes["font-size"] = getScaledFontSize("12pt");
            attributes["font-weight"] = REGULAR_FONT_WEIGHT;
            attributes["color"] = "white";
            return attributes;
        }
        UI.getDefaultProfilePicAttributes = getDefaultProfilePicAttributes;
        function getHorizontalDiv(childrenElements, attributes) {
            if (attributes === void 0) { attributes = null; }
            var div = getDiv(Object.assign(getHorizontalDivAttributes(), attributes));
            for (var i = 0; i < childrenElements.length; i++) {
                var childElement = childrenElements[i];
                if (childElement) {
                    addElement(childElement, div);
                }
            }
            return div;
        }
        UI.getHorizontalDiv = getHorizontalDiv;
        function getVerticalDiv(childrenElements, attributes) {
            if (attributes === void 0) { attributes = null; }
            var div = getDiv(Object.assign(getVerticalDivAttributes(), attributes));
            for (var i = 0; i < childrenElements.length; i++) {
                var childElement = childrenElements[i];
                if (childElement) {
                    addElement(childElement, div);
                }
            }
            return div;
        }
        UI.getVerticalDiv = getVerticalDiv;
        function getFlexibleSpace() {
            return getDiv(getCoverRestOfTheSpaceAttributes());
        }
        UI.getFlexibleSpace = getFlexibleSpace;
        function getSpace(length) {
            if (length === void 0) { length = DEFAULT_SPACE_LENGTH; }
            return getDiv(getSpaceAttributes(length));
        }
        UI.getSpace = getSpace;
        function getLabel(text, attributes) {
            if (text === void 0) { text = null; }
            if (attributes === void 0) { attributes = null; }
            var labelDiv = getDiv(Object.assign(getLabelAttributes(), attributes));
            setText(labelDiv, text);
            return labelDiv;
        }
        UI.getLabel = getLabel;
        function getButton(title, clickEvent, attributes) {
            if (title === void 0) { title = null; }
            if (clickEvent === void 0) { clickEvent = null; }
            if (attributes === void 0) { attributes = null; }
            var buttonDiv = getDiv(attributes);
            setText(buttonDiv, title);
            addClickEvent(buttonDiv, clickEvent);
            return buttonDiv;
        }
        UI.getButton = getButton;
        function setText(element, text) {
            if (text === void 0) { text = null; }
            element.innerHTML = text.trim();
        }
        UI.setText = setText;
        function getBase64CircularImage(data, dimen, attributes) {
            if (data === void 0) { data = null; }
            if (dimen === void 0) { dimen = DEFAULT_IMAGE_DIMEN; }
            if (attributes === void 0) { attributes = null; }
            return getBase64Image(data, Object.assign(getCircularImageAttributes(dimen), attributes));
        }
        UI.getBase64CircularImage = getBase64CircularImage;
        function getCircularImage(path, dimen, attributes) {
            if (path === void 0) { path = null; }
            if (dimen === void 0) { dimen = DEFAULT_IMAGE_DIMEN; }
            if (attributes === void 0) { attributes = null; }
            return getImage(path, Object.assign(getCircularImageAttributes(dimen), attributes));
        }
        UI.getCircularImage = getCircularImage;
        function getBase64Image(data, attributes) {
            if (data === void 0) { data = null; }
            if (attributes === void 0) { attributes = null; }
            var image = getElement("img", Object.assign(getImageAttributes(), attributes));
            image.src = getBase64Src(data);
            return image;
        }
        UI.getBase64Image = getBase64Image;
        function getBase64Src(data) {
            return "data:image/png;base64," + data;
        }
        UI.getBase64Src = getBase64Src;
        function getImage(path, attributes) {
            if (path === void 0) { path = null; }
            if (attributes === void 0) { attributes = null; }
            var image = getElement("img", Object.assign(getImageAttributes(), attributes));
            image.src = path;
            return image;
        }
        UI.getImage = getImage;
        function getDiv(attributes) {
            if (attributes === void 0) { attributes = null; }
            return getElement("div", attributes);
        }
        UI.getDiv = getDiv;
        function getPrettyPrintDiv(attributes) {
            if (attributes === void 0) { attributes = null; }
            return getElement("pre", attributes);
        }
        UI.getPrettyPrintDiv = getPrettyPrintDiv;
        function getCanvas(width, height, attributes) {
            if (attributes === void 0) { attributes = null; }
            var canvas = createHiDPICanvas(width, height);
            addCSS(canvas, attributes);
            return canvas;
        }
        UI.getCanvas = getCanvas;
        function getLoadingSpinner(attributes) {
            if (attributes === void 0) { attributes = null; }
            return getDiv(Object.assign(getLoadingSpinnerAttributes(), attributes));
        }
        UI.getLoadingSpinner = getLoadingSpinner;
        /////////////////// CSS Attributes ///////////////////
        function getHorizontalDivAttributes() {
            var attributes = {};
            attributes["display"] = "flex";
            attributes["flex-direction"] = "row";
            attributes["align-items"] = "center";
            attributes["justify-content"] = "space-between";
            return attributes;
        }
        UI.getHorizontalDivAttributes = getHorizontalDivAttributes;
        function getVerticalDivAttributes() {
            var attributes = {};
            attributes["display"] = "flex";
            attributes["flex-direction"] = "column";
            attributes["justify-content"] = "space-between";
            return attributes;
        }
        UI.getVerticalDivAttributes = getVerticalDivAttributes;
        function getCircularImageAttributes(dimen) {
            var attributes = getImageAttributes();
            attributes["border-radius"] = "50%";
            attributes["width"] = dimen;
            attributes["height"] = dimen;
            attributes["flex"] = "none";
            return attributes;
        }
        UI.getCircularImageAttributes = getCircularImageAttributes;
        function getImageAttributes() {
            var attributes = {};
            // Aspect fill
            attributes["overflow"] = "hidden";
            attributes["object-fit"] = "cover";
            return attributes;
        }
        UI.getImageAttributes = getImageAttributes;
        function getLabelAttributes() {
            var attributes = {};
            attributes["overflow-wrap"] = "break-word";
            attributes["word-wrap"] = "break-word";
            attributes["word-break"] = "break-word";
            // attributes["-ms-hyphens"] = "auto";
            // attributes["-moz-hyphens"] = "auto";
            // attributes["-webkit-hyphens"] = "auto";
            // attributes["hyphens"] = "auto";
            return attributes;
        }
        UI.getLabelAttributes = getLabelAttributes;
        function getSpaceAttributes(length) {
            var attributes = {};
            attributes["width"] = length;
            attributes["height"] = length;
            attributes["flex"] = "none";
            return attributes;
        }
        UI.getSpaceAttributes = getSpaceAttributes;
        function getCoverRestOfTheSpaceAttributes() {
            var attributes = {};
            attributes["flex"] = "1";
            return attributes;
        }
        UI.getCoverRestOfTheSpaceAttributes = getCoverRestOfTheSpaceAttributes;
        function getLoadingSpinnerAttributes() {
            addLoadingSpinnerAnimation();
            var attributes = {};
            var borderWidth = "2pt solid ";
            attributes["border"] = borderWidth + PAGE_BG_COLOR;
            attributes["border-top"] = borderWidth + LIGHT_BLUE_COLOR;
            attributes["border-bottom"] = borderWidth + LIGHT_BLUE_COLOR;
            attributes["border-radius"] = "50%";
            attributes["width"] = "16pt";
            attributes["height"] = "16pt";
            attributes["animation"] = "spin 1.5s ease-in-out infinite";
            return attributes;
        }
        UI.getLoadingSpinnerAttributes = getLoadingSpinnerAttributes;
        var spinnerCSSAdded = false;
        function addLoadingSpinnerAnimation() {
            if (spinnerCSSAdded) {
                return;
            }
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }";
            document.getElementsByTagName('head')[0].appendChild(style);
            spinnerCSSAdded = true;
        }
        /////////////////// General Utility ///////////////////
        function drawPieChart(data, colors, borderColor, canvas, canvasWidth, canvasHeight) {
            var ctx = canvas.getContext("2d");
            var total = 0;
            for (var i = 0; i < data.length; i++) {
                total += data[i];
            }
            var lineWidth = 1;
            var radius = canvasHeight / 2 - lineWidth;
            var counterClockWise = false;
            var startAngle = -(Math.PI / 2);
            for (var i = 0; i < data.length; i++) {
                ctx.fillStyle = colors[i];
                ctx.strokeStyle = borderColor;
                ctx.lineWidth = lineWidth;
                var endAngle = startAngle + (2 * Math.PI * (data[i] / total));
                ctx.beginPath();
                ctx.moveTo(canvasWidth / 2, canvasHeight / 2);
                ctx.arc(canvasWidth / 2, canvasHeight / 2, radius, startAngle, endAngle, counterClockWise);
                ctx.lineTo(canvasWidth / 2, canvasHeight / 2);
                ctx.fill();
                ctx.stroke();
                startAngle = endAngle;
            }
            UI.setAccessibilityAttribute(canvas, UI.KASFormAccessibilityKey.Hidden, "true");
        }
        UI.drawPieChart = drawPieChart;
        function addElement(element, parentElement) {
            if (element === void 0) { element = null; }
            if (parentElement === void 0) { parentElement = null; }
            if (element && parentElement) {
                parentElement.appendChild(element);
            }
        }
        UI.addElement = addElement;
        function removeElement(element, parentElement) {
            if (element === void 0) { element = null; }
            if (parentElement === void 0) { parentElement = null; }
            if (element == null)
                return;
            var parent;
            if (null == parentElement) {
                parent = element.parentElement;
            }
            else {
                parent = parentElement;
            }
            if (element && parent && parent.contains(element)) {
                parent.removeChild(element);
            }
        }
        UI.removeElement = removeElement;
        function replaceElement(newElement, oldElement, parentElement) {
            if (newElement === void 0) { newElement = null; }
            if (oldElement === void 0) { oldElement = null; }
            if (parentElement === void 0) { parentElement = null; }
            if (newElement && oldElement && parentElement) {
                parentElement.replaceChild(newElement, oldElement);
            }
        }
        UI.replaceElement = replaceElement;
        function clearElement(element) {
            if (element === void 0) { element = null; }
            while (element && element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }
        UI.clearElement = clearElement;
        function getElement(elementTag, attributes) {
            if (attributes === void 0) { attributes = null; }
            var element = document.createElement(elementTag);
            addCSS(element, attributes);
            return element;
        }
        UI.getElement = getElement;
        function addClickEvent(element, clickEvent) {
            if (clickEvent != null) {
                element.onclick = clickEvent;
            }
        }
        UI.addClickEvent = addClickEvent;
        function setId(element, id) {
            if (id != null || id != "") {
                element.id = id;
            }
        }
        UI.setId = setId;
        function setClass(element, className) {
            if (className != null || className != "") {
                element.className = className;
            }
        }
        UI.setClass = setClass;
        function addCSS(element, attributes) {
            if (attributes != null) {
                var cssText = "";
                if (element.style.cssText && element.style.cssText != "") {
                    cssText = element.style.cssText;
                }
                for (var key in attributes) {
                    cssText += key + ":" + attributes[key] + ";";
                }
                element.style.cssText = cssText;
            }
        }
        UI.addCSS = addCSS;
        function getPixelRatio() {
            var ctx = document.createElement("canvas").getContext("2d"), dpr = window.devicePixelRatio || 1, bsr = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1;
            return dpr / bsr;
        }
        ;
        function createHiDPICanvas(w, h, ratio) {
            if (ratio === void 0) { ratio = 0; }
            if (!ratio) {
                ratio = getPixelRatio();
            }
            var can = document.createElement("canvas");
            can.width = w * ratio;
            can.height = h * ratio;
            can.style.width = w + "pt";
            can.style.height = h + "pt";
            can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
            return can;
        }
        function getChevronIcon(attributes) {
            if (attributes === void 0) { attributes = null; }
            return getBase64Image(UI.Assets.chevron, Object.assign(getChevronIconAttributes(), attributes));
        }
        UI.getChevronIcon = getChevronIcon;
        function getEditIcon(attributes) {
            if (attributes === void 0) { attributes = null; }
            return getBase64Image(UI.Assets.editImage, Object.assign(getEditIconAttributes(), attributes));
        }
        UI.getEditIcon = getEditIcon;
        function getChevronIconAttributes() {
            var attributes = {};
            attributes["width"] = "7.5pt";
            attributes["height"] = "12pt";
            return attributes;
        }
        function getEditIconAttributes() {
            var attributes = {};
            attributes["position"] = "relative";
            attributes["bottom"] = "15px";
            attributes["right"] = "1px";
            attributes["width"] = "12px";
            attributes["height"] = "12px";
            attributes["object-fit"] = "contain";
            return attributes;
        }
        // For placeholder text, use below CSS in html
        /*  [contenteditable = true]:empty:before {
              content: attr(placeholder);
              color: #98a3af;
          display: block;
        }*/
        function getContentEditableSpan(text, placeholder, attributes, onInputEvent) {
            if (text === void 0) { text = ""; }
            if (placeholder === void 0) { placeholder = ""; }
            if (attributes === void 0) { attributes = null; }
            var element = getElement("span", Object.assign(getContentEditableSpanAttributes(), attributes));
            element.setAttribute("placeholder", placeholder);
            element.setAttribute('contenteditable', "true");
            element.innerText = text;
            var maxLength = attributes["max-length"];
            var prevString = "";
            element.addEventListener('input', function () {
                if (this.innerText.trim() == "") {
                    clearElement(this);
                }
                if (maxLength && this.innerText.length > maxLength) {
                    this.innerText = prevString;
                }
                else if (maxLength) {
                    prevString = this.innerText;
                }
                if (onInputEvent) {
                    onInputEvent();
                }
            });
            return element;
        }
        UI.getContentEditableSpan = getContentEditableSpan;
        function getContentEditableSpanAttributes() {
            var attributes = {};
            attributes["word-break"] = "break-word";
            attributes["-webkit-user-select"] = "text";
            return attributes;
        }
        function showImageImmersiveView(path) {
            if (path === void 0) { path = null; }
            var alertAttributes = {
                "height": "100%",
                "width": "100%",
                "position": "fixed",
                "background-color": "black",
                "z-index": "2",
                "display": "flex",
                "flex": "1",
                "flex-direction": "column",
                "justify-content": "space-around"
            };
            var alertDiv = getElement("div", alertAttributes);
            var cancelButton = getBase64Image(UI.Assets.cancel, { "position": "absolute", "width": "20px", "height": "20px", "left": "10px", "top": "30px" });
            cancelButton.onclick = function () {
                removeElement(alertDiv, document.body);
            };
            addElement(cancelButton, alertDiv);
            var alertView = getElement("div", {
                "max-height": "80%",
                "background-color": "transparent",
                "display": "flex",
                "flex-direction": "column",
                "margin-left": "0px",
                "margin-right": "0px"
            });
            addElement(alertView, alertDiv);
            var imageView = getImage(path, {
                "object-fit": "contain"
            });
            addElement(imageView, alertView);
            addElement(alertDiv, document.body);
        }
        UI.showImageImmersiveView = showImageImmersiveView;
        function showAlertDailog(title, message, okButtonTitle, okButtonAction, cancelButtonTitle, cancelButtonAction) {
            var alertDiv = getAlertDailog(title, message, okButtonTitle, okButtonAction, cancelButtonTitle, cancelButtonAction);
            addElement(alertDiv, document.body);
        }
        UI.showAlertDailog = showAlertDailog;
        function getAlertDailog(title, message, okButtonTitle, okButtonAction, cancelButtonTitle, cancelButtonAction) {
            var alertAttributes = {
                "height": "100%",
                "width": "100%",
                "position": "fixed",
                "top": "0",
                "left": "0",
                "background-color": "rgba(50, 72, 95, 0.5)",
                "z-index": "2",
                "display": "flex",
                "flex": "1",
                "flex-direction": "column",
                "justify-content": "space-around"
            };
            var alertDiv = getElement("div", alertAttributes);
            var alertView = getElement("div", { "margin": "20px", "padding": "20px", "background-color": "white", "display": "flex", "flex-direction": "column" });
            addElement(alertView, alertDiv);
            var alertTitleView = getLabel(title, { "color": "#32485f", "font-size": getScaledFontSize("20px"), "font-weight": "600" });
            addElement(alertTitleView, alertView);
            var alertMessageView = getLabel(message, { "margin-top": "20px", "margin-bottom": "20px", "color": "#6f7e8f", "font-size": getScaledFontSize("16px") });
            addElement(alertMessageView, alertView);
            var alertBottomView = getElement("div", { "display": "flex", "justify-content": "flex-end" });
            addElement(alertBottomView, alertView);
            var buttonAttributes = {
                "font-size": getScaledFontSize("14px"),
                "font-weight": "600",
                "margin-left": "20px",
                "color": BLUE_COLOR,
                "-webkit-appearance": "none",
                "border": "none"
            };
            if (cancelButtonTitle != null && cancelButtonTitle != "") {
                var cancelButton = getLabel(cancelButtonTitle, buttonAttributes);
                cancelButton.onclick = function () {
                    removeElement(alertDiv, document.body);
                    if (cancelButtonAction)
                        cancelButtonAction();
                };
                KASClient.UI.setAccessibilityBasic(cancelButton, false, UI.KASFormAccessibilityRole.Button);
                addElement(cancelButton, alertBottomView);
            }
            if (okButtonTitle != null && okButtonTitle != "") {
                var okButton = getLabel(okButtonTitle, buttonAttributes);
                okButton.onclick = function () {
                    removeElement(alertDiv, document.body);
                    if (okButtonAction)
                        okButtonAction();
                };
                KASClient.UI.setAccessibilityBasic(okButton, false, UI.KASFormAccessibilityRole.Button);
                addElement(okButton, alertBottomView);
            }
            return alertDiv;
        }
        UI.getAlertDailog = getAlertDailog;
        /* should dismiss view when user taps on gray-area. Required to add a transparent accessibility label to let user know that it can be dismissed by tapping in background */
        function getAlertDialogWithDiv(divElement, dismissOnBackgroundTap, cancelCallBack) {
            if (divElement == null) {
                return null;
            }
            var alertFullScreenDivAttributes = {
                "height": "100%",
                "width": "100%",
                "position": "fixed",
                "display": "none",
                "background-color": "rgba(50, 72, 95, 0.5)",
                "z-index": "2",
            };
            var alertFullScreenDiv = getDiv(alertFullScreenDivAttributes);
            if (dismissOnBackgroundTap) {
                var hiddenCancelButton = getButton("", cancelCallBack, { "postion": "fixed", "width": "10px", "height": "10px", "margin-top": "0px", "margin-left": "0px", "background-color": "Transparent" });
                UI.setAccessibilityBasic(hiddenCancelButton, false, UI.KASFormAccessibilityRole.Button, KASClient.Internal.getKASClientString("KASAlertViewsHiddenDismissButtonAccessibilityText"));
                addElement(hiddenCancelButton, alertFullScreenDiv);
            }
            addElement(divElement, alertFullScreenDiv);
            return alertFullScreenDiv;
        }
        UI.getAlertDialogWithDiv = getAlertDialogWithDiv;
        /// returns "u/d/r/l" as string for swipe directions (up/down/right/left) respectively
        /// https://stackoverflow.com/questions/15084675/how-to-implement-swipe-gestures-for-mobile-devices
        function addSwipeGesture(element, callback) {
            var swipe_det = new Object();
            var sX = 0, sY = 0, eX = 0, eY = 0;
            var min_x = 30, max_x = 30, min_y = 50, max_y = 60;
            var direc = "";
            element.addEventListener('touchstart', function (e) {
                var t = e.touches[0];
                sX = t.screenX;
                sY = t.screenY;
            }, false);
            element.addEventListener('touchmove', function (e) {
                e.preventDefault();
                var t = e.touches[0];
                eX = t.screenX;
                eY = t.screenY;
            }, false);
            element.addEventListener('touchend', function (e) {
                //horizontal detection
                if ((((eX - min_x > sX) || (eX + min_x < sX)) && ((eY < sY + max_y) && (sY > eY - max_y) && (eX > 0)))) {
                    if (eX > sX)
                        direc = "r";
                    else
                        direc = "l";
                }
                else if ((((eY - min_y > sY) || (eY + min_y < sY)) && ((eX < sX + max_x) && (sX > eX - max_x) && (eY > 0)))) {
                    if (eY > sY)
                        direc = "d";
                    else
                        direc = "u";
                }
                if (direc != "" && callback != null) {
                    callback(direc);
                }
                direc = "";
                sX = 0;
                sY = 0;
                eX = 0;
                eY = 0;
            }, false);
        }
        UI.addSwipeGesture = addSwipeGesture;
        function removeSwipeGesture(element) {
            element.removeEventListener('touchstart', function (e) { }, false);
            element.removeEventListener('touchmove', function (e) { }, false);
            element.removeEventListener('touchend', function (e) { }, false);
        }
        UI.removeSwipeGesture = removeSwipeGesture;
        function getMediumFontAttributes() {
            if (KASClient.getPlatform() == KASClient.Platform.Android) {
                return {
                    "font-family": "sans-serif-medium"
                };
            }
            else {
                return {
                    "font-weight": "600"
                };
            }
        }
        UI.getMediumFontAttributes = getMediumFontAttributes;
        function getScaledFontSize(fontSize) {
            if (KASClient.getPlatform() == KASClient.Platform.Android)
                return fontSize;
            if (fontSize == null || fontSize == "" || fontSize == undefined)
                return fontSize;
            var size = parseFloat(fontSize);
            if (isNaN(size))
                return fontSize;
            var unit = fontSize.substr(size.toString().length, fontSize.length - size.toString().length);
            size = size * iOSFontSizeScaleMultiplier;
            return size.toString() + unit;
        }
        UI.getScaledFontSize = getScaledFontSize;
        function getAttachmentIconBase64(attachmentExtension) {
            switch (attachmentExtension) {
                case "pdf":
                    return UI.Assets.pdfIcon;
                case "ppt":
                case "pptx":
                    return UI.Assets.pptIcon;
                case "xls":
                case "xlsx":
                    return UI.Assets.excelIcon;
                case "doc":
                case "docx":
                    return UI.Assets.wordIcon;
                case "mp3":
                case "ogg":
                    return UI.Assets.audioPlay;
                default:
                    return UI.Assets.documentIcon;
            }
        }
        UI.getAttachmentIconBase64 = getAttachmentIconBase64;
        /**
         * Offset position of element
         */
        function findPosition(element) {
            var curleft = 0;
            var curtop = 0;
            var curright = 0;
            var curbottom = 0;
            if (element.offsetParent) {
                do {
                    curleft += element.offsetLeft;
                    curtop += element.offsetTop;
                } while (element = element.offsetParent);
            }
            return [curtop, curleft];
        }
        UI.findPosition = findPosition;
        /**
         * Style value of element
         */
        function getStyle(element, styleName) {
            // J/S Pro Techniques p136
            if (element.style[styleName]) {
                return element.style[styleName];
            }
            else if (element.currentStyle) {
                return element.currentStyle[styleName];
            }
            else if (document.defaultView && document.defaultView.getComputedStyle) {
                styleName = styleName.replace(/([A-Z])/g, "-$1");
                styleName = styleName.toLowerCase();
                var s = document.defaultView.getComputedStyle(element, "");
                return s && s.getPropertyValue(styleName);
            }
            else {
                return null;
            }
        }
        UI.getStyle = getStyle;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var Customise;
    (function (Customise) {
        // CustomisationType {
        //    None = 0,
        //    Text,
        //    Numeric,
        //    Boolean,
        //    Color,
        //    Image
        // }
        // Customisation {
        //    type: CustomisationType;
        //    config: string;
        //    context: string;
        //    dependencies: string[];
        // }
        function getCustomizeButton() {
            var customizeText = KASClient.UI.getLabel(KASClient.Internal.getKASClientString("TemplateCustomizeButtonText"));
            var customizeIcon = KASClient.UI.getBase64Image(KASClient.UI.Assets.whiteEditIcon, {
                "margin-left": "4px",
                "object-fit": "contain",
                "width": "15px",
                "height": "15px"
            });
            return KASClient.UI.getHorizontalDiv([customizeText, customizeIcon], {
                "cursor": "pointer",
                "background-color": BLUE_COLOR,
                "color": "white",
                "padding": "5px",
                "position": "absolute",
                "z-index": "100",
                "font-size": "10px",
                "letter-spacing": "1px",
                "display": "none"
            });
        }
        var customizeButton = null;
        function register(element, customisations) {
            if (KASClient.isRenderedForActionDesigner()) {
                if (customizeButton == null) {
                    customizeButton = getCustomizeButton();
                    KASClient.UI.addElement(customizeButton, document.body);
                }
                element.onmousemove = function () {
                    var pos = KASClient.UI.findPosition(element);
                    customizeButton.style.display = "flex";
                    var top = pos[0];
                    var left = pos[1];
                    if (top < document.body.scrollTop) {
                        top = document.body.scrollTop;
                    }
                    customizeButton.style.top = (top).toString();
                    customizeButton.style.left = (left).toString();
                    customizeButton.onclick = function () {
                        window.parent["onKASEditableElementClicked"](customisations);
                    };
                };
                // var marginTop = parseInt(UI.getStyle(element, "marginTop"));
                // element.style.marginTop = (isNaN(marginTop) ? 0 : marginTop) + 1 + "px";
                element.style.border = "2px dotted " + BLUE_COLOR;
            }
        }
        Customise.register = register;
        function getAsset(assetName) {
            if (!KASClient.isRenderedForActionDesigner()) {
                return assetName;
            }
            else {
                return window.parent["getKASEditableAsset"](assetName);
            }
        }
        Customise.getAsset = getAsset;
    })(Customise = KASClient.Customise || (KASClient.Customise = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var ChatCard;
    (function (ChatCard) {
        /* THIS FILE SHOULD BE SIMILAR TO Apps/React/React/Storage/datamodels/Survey/ChatCardTemplate.m */
        var ChatCardTemplateType;
        (function (ChatCardTemplateType) {
            ChatCardTemplateType[ChatCardTemplateType["UnknownChatCard"] = 0] = "UnknownChatCard";
            ChatCardTemplateType[ChatCardTemplateType["DefaultChatCard"] = 1] = "DefaultChatCard";
            ChatCardTemplateType[ChatCardTemplateType["CustomChatCard"] = 2] = "CustomChatCard";
        })(ChatCardTemplateType = ChatCard.ChatCardTemplateType || (ChatCard.ChatCardTemplateType = {}));
        var ChatCardTemplate = (function () {
            function ChatCardTemplate() {
                this.templateType = ChatCardTemplateType.UnknownChatCard;
            }
            ChatCardTemplate.prototype.toJSON = function () {
                var object = JSON.parse("{}");
                object["templateType"] = this.templateType;
                return object;
            };
            return ChatCardTemplate;
        }());
        ChatCard.ChatCardTemplate = ChatCardTemplate;
    })(ChatCard = KASClient.ChatCard || (KASClient.ChatCard = {}));
})(KASClient || (KASClient = {}));
/// <reference path="./ChatCardTemplate.ts" />
var KASClient;
(function (KASClient) {
    var ChatCard;
    (function (ChatCard) {
        /* THIS FILE SHOULD BE SIMILAR TO Apps/React/React/Storage/datamodels/Survey/CustomChatCardTemplate.m */
        var CustomChatCardTemplate = (function (_super) {
            __extends(CustomChatCardTemplate, _super);
            function CustomChatCardTemplate() {
                var _this = _super.call(this) || this;
                _this.showSettings = true;
                _this.showLikesAndComments = true;
                _this.rootView = new ChatCard.View();
                _this.templateType = ChatCard.ChatCardTemplateType.CustomChatCard;
                return _this;
            }
            CustomChatCardTemplate.prototype.toJSON = function () {
                var object = _super.prototype.toJSON.call(this);
                object["showSettings"] = this.showSettings;
                object["showLikesAndComments"] = this.showLikesAndComments;
                object["root"] = this.rootView.toJSON();
                return object;
            };
            return CustomChatCardTemplate;
        }(ChatCard.ChatCardTemplate));
        ChatCard.CustomChatCardTemplate = CustomChatCardTemplate;
    })(ChatCard = KASClient.ChatCard || (KASClient.ChatCard = {}));
})(KASClient || (KASClient = {}));
/// <reference path="./ChatCardTemplate.ts" />
var KASClient;
(function (KASClient) {
    var ChatCard;
    (function (ChatCard) {
        /* THIS FILE SHOULD BE SIMILAR TO Apps/React/React/Storage/datamodels/Survey/DefaultChatCardTemplate.m */
        var ShortSummaryStatus;
        (function (ShortSummaryStatus) {
            ShortSummaryStatus[ShortSummaryStatus["NoResponse"] = 0] = "NoResponse";
            ShortSummaryStatus[ShortSummaryStatus["SomeResponse"] = 1] = "SomeResponse";
            ShortSummaryStatus[ShortSummaryStatus["CompleteResponse"] = 2] = "CompleteResponse";
        })(ShortSummaryStatus = ChatCard.ShortSummaryStatus || (ChatCard.ShortSummaryStatus = {}));
        var DefaultChatCardTemplate = (function (_super) {
            __extends(DefaultChatCardTemplate, _super);
            function DefaultChatCardTemplate() {
                var _this = _super.call(this) || this;
                _this.showSettings = true;
                _this.showTitle = true;
                _this.showSubtitle = true;
                _this.showSummary = true;
                _this.showLikesAndComments = true;
                _this.showResponseInfo = true;
                _this.showResponseStatus = false;
                // Either of the below two can be true
                _this.showResponse = false;
                _this.showRespondButton = true;
                _this.shortSummaryStatus = ShortSummaryStatus.NoResponse;
                _this.cardTitle = null;
                _this.cardSubtitle = null;
                _this.cardSummaryText = null;
                _this.cardResponseStatusText = null;
                // Either of the below two can appear on screen
                _this.cardResponseText = null;
                _this.cardRespondButtonText = null;
                _this.templateType = ChatCard.ChatCardTemplateType.DefaultChatCard;
                return _this;
            }
            DefaultChatCardTemplate.prototype.toJSON = function () {
                var object = _super.prototype.toJSON.call(this);
                object["showSettings"] = this.showSettings;
                object["showTitle"] = this.showTitle;
                object["showSubtitle"] = this.showSubtitle;
                object["showSummary"] = this.showSummary;
                object["showLikesAndComments"] = this.showLikesAndComments;
                object["showResponseInfo"] = this.showResponseInfo;
                object["showResponseStatus"] = this.showResponseStatus;
                object["showResponse"] = this.showResponse;
                object["showRespondButton"] = this.showRespondButton;
                object["shortSummaryStatus"] = this.shortSummaryStatus;
                if (this.cardTitle) {
                    object["cardTitle"] = this.cardTitle;
                }
                if (this.cardSubtitle) {
                    object["cardSubtitle"] = this.cardSubtitle;
                }
                if (this.cardSummaryText) {
                    object["cardSummaryText"] = this.cardSummaryText;
                }
                if (this.cardResponseStatusText) {
                    object["cardResponseStatusText"] = this.cardResponseStatusText;
                }
                if (this.cardResponseText) {
                    object["cardResponseText"] = this.cardResponseText;
                }
                if (this.cardRespondButtonText) {
                    object["cardRespondButtonText"] = this.cardRespondButtonText;
                }
                return object;
            };
            return DefaultChatCardTemplate;
        }(ChatCard.ChatCardTemplate));
        ChatCard.DefaultChatCardTemplate = DefaultChatCardTemplate;
    })(ChatCard = KASClient.ChatCard || (KASClient.ChatCard = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var ChatCard;
    (function (ChatCard) {
        var View = (function () {
            function View() {
                this.type = "View";
                this.id = "KASClient.ChatCard." + this.type + View.idIterator++;
                this.style = JSON.parse("{}");
                this.onClickHandler = null;
                this.subviews = [];
            }
            View.prototype.addSubview = function (subview) {
                this.subviews.push(subview);
            };
            View.prototype.getSubviewById = function (id) {
                for (var i = 0; i < this.subviews.length; i++) {
                    var subview = this.subviews[i];
                    if (subview.id && subview.id == id) {
                        return subview;
                    }
                }
                return null;
            };
            View.prototype.removeSubviewById = function (id) {
                for (var i = 0; i < this.subviews.length; i++) {
                    var subview = this.subviews[i];
                    if (subview.id && subview.id == id) {
                        this.subviews.splice(i, 1);
                    }
                }
            };
            View.prototype.toJSON = function () {
                var object = JSON.parse("{}");
                if (this.id && this.id != "") {
                    object["id"] = this.id;
                }
                object["type"] = this.type;
                if (this.style && Object.keys(this.style).length > 0) {
                    object["style"] = this.style;
                }
                if (this.onClickHandler && this.onClickHandler != "") {
                    object["onClick"] = this.onClickHandler;
                }
                if (this.subviews.length > 0) {
                    object["children"] = [];
                    for (var i = 0; i < this.subviews.length; i++) {
                        var subview = this.subviews[i];
                        object["children"].push(subview.toJSON());
                    }
                }
                return object;
            };
            View.fromJSON = function (object, view) {
                if (view === void 0) { view = null; }
                if (view == null) {
                    view = new View();
                }
                if (object) {
                    if (object.hasOwnProperty("id")) {
                        view.id = object["id"];
                    }
                    if (object.hasOwnProperty("type")) {
                        view.type = object["type"];
                    }
                    if (object.hasOwnProperty("style")) {
                        view.style = object["style"];
                    }
                    if (object.hasOwnProperty("onClick")) {
                        view.onClickHandler = object["onClick"];
                    }
                    if (object.hasOwnProperty("children")) {
                        view.subviews = [];
                        for (var i = 0; i < object["children"].length; i++) {
                            var childNode = object["children"][i];
                            var subview = this.fromJSON(childNode);
                            view.subviews.push(subview);
                        }
                    }
                }
                return view;
            };
            View.idIterator = 0;
            return View;
        }());
        ChatCard.View = View;
        var FixedSpace = (function (_super) {
            __extends(FixedSpace, _super);
            function FixedSpace(length) {
                if (length === void 0) { length = 0; }
                var _this = _super.call(this) || this;
                _this.style["width"] = length;
                _this.style["height"] = length;
                _this.style["flex"] = 0;
                return _this;
            }
            return FixedSpace;
        }(View));
        ChatCard.FixedSpace = FixedSpace;
        var FlexibleSpace = (function (_super) {
            __extends(FlexibleSpace, _super);
            function FlexibleSpace() {
                var _this = _super.call(this) || this;
                _this.style["flex"] = 1;
                return _this;
            }
            return FlexibleSpace;
        }(View));
        ChatCard.FlexibleSpace = FlexibleSpace;
    })(ChatCard = KASClient.ChatCard || (KASClient.ChatCard = {}));
})(KASClient || (KASClient = {}));
/// <reference path="./View.ts" />
var KASClient;
(function (KASClient) {
    var ChatCard;
    (function (ChatCard) {
        var HorizontalContainer = (function (_super) {
            __extends(HorizontalContainer, _super);
            function HorizontalContainer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.type = "Row";
                return _this;
            }
            return HorizontalContainer;
        }(ChatCard.View));
        ChatCard.HorizontalContainer = HorizontalContainer;
    })(ChatCard = KASClient.ChatCard || (KASClient.ChatCard = {}));
})(KASClient || (KASClient = {}));
/// <reference path="./View.ts" />
var KASClient;
(function (KASClient) {
    var ChatCard;
    (function (ChatCard) {
        var Image = (function (_super) {
            __extends(Image, _super);
            function Image(s) {
                if (s === void 0) { s = null; }
                var _this = _super.call(this) || this;
                _this.type = "Image";
                _this.source = "";
                _this.source = s;
                return _this;
            }
            Image.prototype.toJSON = function () {
                var object = _super.prototype.toJSON.call(this);
                object["source"] = this.source;
                return object;
            };
            Image.fromJSON = function (object) {
                var image = new Image();
                _super.fromJSON.call(this, object, image);
                if (object) {
                    if (object.hasOwnProperty("source")) {
                        image.source = object["source"];
                    }
                }
                return image;
            };
            return Image;
        }(ChatCard.View));
        ChatCard.Image = Image;
    })(ChatCard = KASClient.ChatCard || (KASClient.ChatCard = {}));
})(KASClient || (KASClient = {}));
/// <reference path="./View.ts" />
var KASClient;
(function (KASClient) {
    var ChatCard;
    (function (ChatCard) {
        var Text = (function (_super) {
            __extends(Text, _super);
            function Text(t) {
                if (t === void 0) { t = ""; }
                var _this = _super.call(this) || this;
                _this.type = "Text";
                _this.text = "";
                _this.text = t;
                return _this;
            }
            Text.prototype.toJSON = function () {
                var object = _super.prototype.toJSON.call(this);
                object["text"] = this.text;
                return object;
            };
            Text.fromJSON = function (object) {
                var text = new Text();
                _super.fromJSON.call(this, object, text);
                if (object) {
                    if (object.hasOwnProperty("text")) {
                        text.text = object["text"];
                    }
                }
                return text;
            };
            return Text;
        }(ChatCard.View));
        ChatCard.Text = Text;
        ChatCard.Button = Text; // As there's no difference between the two
    })(ChatCard = KASClient.ChatCard || (KASClient.ChatCard = {}));
})(KASClient || (KASClient = {}));
/// <reference path="./View.ts" />
var KASClient;
(function (KASClient) {
    var ChatCard;
    (function (ChatCard) {
        var VerticalContainer = (function (_super) {
            __extends(VerticalContainer, _super);
            function VerticalContainer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.type = "Column";
                return _this;
            }
            return VerticalContainer;
        }(ChatCard.View));
        ChatCard.VerticalContainer = VerticalContainer;
    })(ChatCard = KASClient.ChatCard || (KASClient.ChatCard = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASAlbumView = (function (_super) {
            __extends(KASAlbumView, _super);
            function KASAlbumView() {
                var _this = _super.call(this) || this;
                _this.imageLocalPaths = null;
                _this.albumViewDiv = null;
                _this.slides = [];
                _this.photoIndexLabel = null;
                _this.currentIndex = 0;
                _this.gradientView = null;
                _this.showingThumbnail = false;
                _this.swipeCallBack = function (direction) { this.onSwipe(direction); }.bind(_this);
                _this.view.style.position = "relative";
                _this.albumViewDiv = KASClient.UI.getElement("div", _this.getAlbumViewDivAttributes());
                _this.gradientView = KASClient.UI.getDiv({
                    "background": "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.6))",
                    "height": "40px",
                    "bottom": "0px",
                    "left": "0px",
                    "width": "100%",
                    "position": "absolute"
                });
                KASClient.UI.addSwipeGesture(_this.albumViewDiv, _this.swipeCallBack);
                KASClient.UI.addElement(_this.albumViewDiv, _this.view);
                return _this;
            }
            KASAlbumView.prototype.refreshView = function () {
                KASClient.UI.removeElement(this.blurView, this.view);
                for (var i = 0; i < this.slides.length; i++) {
                    KASClient.UI.removeElement(this.slides[i], this.albumViewDiv);
                }
                this.slides = [];
                this.currentIndex = 0;
                this.populateImagesForLocalPaths(this.imageLocalPaths);
            };
            KASAlbumView.prototype.showViewForLocalImages = function () {
                this.populateImagesForLocalPaths(this.imageLocalPaths);
            };
            KASAlbumView.prototype.showThumbnail = function () {
                if (!KASClient.isEmptyString(this.thumbnailBase64)) {
                    this.showingThumbnail = true;
                    var slide = this.getSlideWithImageSrc(KASClient.UI.getBase64Src(this.thumbnailBase64));
                    KASClient.UI.setAccessibilityBasic(slide, true);
                    KASClient.UI.addElement(slide, this.albumViewDiv);
                }
            };
            KASAlbumView.prototype.showTapToDownloadView = function () {
                this.addTapToDownloadButtonToDiv(this.view);
            };
            KASAlbumView.prototype.hideTapToDownloadView = function () {
                KASClient.UI.removeElement(this.blurView, this.view);
            };
            KASAlbumView.prototype.popualatePhotoIndexLabel = function () {
                if (this.slides.length > 1) {
                    this.photoIndexLabel.style.display = "block";
                    this.photoIndexLabel.innerText = (this.currentIndex + 1) + " / " + this.slides.length;
                }
                else {
                    this.photoIndexLabel.style.display = "none";
                    KASClient.UI.setAccessibilityBasic(this.photoIndexLabel, true);
                }
            };
            KASAlbumView.prototype.populateImagesForLocalPaths = function (localPaths) {
                this.showingThumbnail = false;
                KASClient.UI.clearElement(this.albumViewDiv);
                this.photoIndexLabel = KASClient.UI.getDiv({
                    "font-size": KASClient.UI.getScaledFontSize("14px"),
                    "bottom": "10px",
                    "right": "15px",
                    "position": "absolute",
                    "color": "white"
                });
                for (var i = 0; i < localPaths.length; i++) {
                    var slide = this.getSlideWithImageSrc(localPaths[i]);
                    this.slides.push(slide);
                    KASClient.UI.addElement(slide, this.albumViewDiv);
                }
                if (localPaths.length > 1) {
                    var prev = KASClient.UI.getBase64Image(UI.Assets.leftArrowAlbum, this.getPrevBtnAttributes());
                    prev.onclick = function () { event.stopPropagation(); this.plusSlides(-1); }.bind(this);
                    KASClient.UI.setAccessibilityBasic(prev, false, UI.KASFormAccessibilityRole.Button, KASClient.Internal.getKASClientString("AlbumPrevButtonAccessibilityText"));
                    var next = KASClient.UI.getBase64Image(UI.Assets.rightArrowAlbum, this.getNextBtnAttributes());
                    next.onclick = function () { event.stopPropagation(); this.plusSlides(1); }.bind(this);
                    KASClient.UI.setAccessibilityBasic(next, false, UI.KASFormAccessibilityRole.Button, KASClient.Internal.getKASClientString("AlbumNextButtonAccessibilityText"));
                    KASClient.UI.addElement(prev, this.albumViewDiv);
                    KASClient.UI.addElement(next, this.albumViewDiv);
                    KASClient.UI.addElement(this.gradientView, this.albumViewDiv);
                }
                if (this.tapEnabled) {
                    this.view.onclick = function () {
                        if (this.onImageTappedCallback)
                            this.onImageTappedCallback(this.currentIndex);
                    }.bind(this);
                }
                if (this.slides.length > 0 && this.shouldShowRemoveButton) {
                    this.addRemoveImageButton();
                }
                KASClient.UI.addElement(this.photoIndexLabel, this.albumViewDiv);
                KASClient.UI.addElement(this.albumViewDiv, this.view);
                this.showSlide(this.currentIndex);
            };
            KASAlbumView.prototype.onSwipe = function (direction) {
                var shiftBy = 0;
                if (direction == 'r')
                    shiftBy = -1;
                else if (direction == 'l')
                    shiftBy = 1;
                this.plusSlides(shiftBy);
            };
            KASAlbumView.prototype.getSlideWithImageSrc = function (src) {
                var slide = KASClient.UI.getElement("div", { "display": "block", "width": "100%", "overflow": "hidden" });
                var image = KASClient.UI.getElement("img", { "width": "100%", "height": "100%", "object-fit": "cover" });
                image.src = src;
                if (this.onImageTappedCallback && !this.showingThumbnail) {
                    KASClient.UI.setAccessibilityBasic(image, false, UI.KASFormAccessibilityRole.Image, KASClient.Internal.getKASClientString("TapToOpenText"));
                }
                else {
                    KASClient.UI.setAccessibilityBasic(image, false, UI.KASFormAccessibilityRole.Image, "");
                }
                KASClient.UI.addElement(image, slide);
                return slide;
            };
            KASAlbumView.prototype.showSlide = function (slideIndex) {
                if (this.slides.length < 1)
                    return;
                // for circular flow of slides
                if (slideIndex >= this.slides.length)
                    slideIndex = 0;
                if (slideIndex < 0)
                    slideIndex = this.slides.length - 1;
                for (var i = 0; i < this.slides.length; i++) {
                    this.slides[i].style.display = "none";
                }
                if (slideIndex < this.slides.length) {
                    this.slides[slideIndex].style.display = "block";
                    this.currentIndex = slideIndex;
                }
                this.popualatePhotoIndexLabel();
            };
            KASAlbumView.prototype.plusSlides = function (n) {
                this.showSlide(this.currentIndex + n);
            };
            KASAlbumView.prototype.getPrevNextBtnAttributes = function () {
                return {
                    "position": "absolute",
                    "object-fit": "contain",
                    "top": "calc(50% - 28px)",
                    "width": "30px",
                    "height": "55px",
                };
            };
            KASAlbumView.prototype.getNextBtnAttributes = function () {
                var attr = this.getPrevNextBtnAttributes();
                attr["right"] = "0";
                return attr;
            };
            KASAlbumView.prototype.getPrevBtnAttributes = function () {
                var attr = this.getPrevNextBtnAttributes();
                attr["left"] = "0";
                return attr;
            };
            KASAlbumView.prototype.getNumberTextAttributes = function () {
                return {
                    "color": "white",
                    "text-shadow": "0px 2px 2px black",
                    "font-size": KASClient.UI.getScaledFontSize("12px"),
                    "padding": "8px 12px",
                    "position": "absolute",
                    "top": "0"
                };
            };
            KASAlbumView.prototype.getAlbumViewDivAttributes = function () {
                return {
                    "display": "flex",
                    "background-color": "#fefefe",
                    "padding": "0",
                    "position": "relative",
                    "width": "100%",
                    "height": "100%"
                };
            };
            KASAlbumView.prototype.addRemoveImageButton = function () {
                var removeImgBtn = KASClient.UI.getBase64Image(UI.Assets.crossButtonBlack, {
                    "position": "absolute",
                    "right": "13px",
                    "top": "13px",
                    "width": "14px",
                    "height": "14px",
                    "padding": "5px" // to increase tap area
                });
                UI.setAccessibilityBasic(removeImgBtn, false, UI.KASFormAccessibilityRole.Button, KASClient.Internal.getKASClientString("RemoveAttachmentFormatText", "Image") + "." + KASClient.Internal.getKASClientString("TapToRemoveText", "Image"));
                KASClient.UI.addElement(removeImgBtn, this.albumViewDiv);
                removeImgBtn.onclick = function () {
                    var indexToRemove = this.currentIndex;
                    if (this.removeImageCallback)
                        this.removeImageCallback(indexToRemove);
                }.bind(this);
            };
            return KASAlbumView;
        }(UI.KASAttachmentView));
        UI.KASAlbumView = KASAlbumView;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASAlbumViewHandler = (function () {
            function KASAlbumViewHandler(albumViewModel) {
                this.model = albumViewModel;
                this.view = new UI.KASAlbumView();
                this.view.retryButtonCallback = function () { this.retryButtonTapped(); }.bind(this);
                this.view.removeImageCallback = function (i) { this.imageRemoved(i); }.bind(this);
                this.view.tapEnabled = this.model.enableOnTap;
                this.view.shouldShowRemoveButton = this.model.showRemoveButton;
                this.view.onImageTappedCallback = function (i) { this.onImageTappedAtIndex(i); }.bind(this);
                this.view.thumbnailBase64 = this.model.thumbnailBase64; // thumbnail should be populated before this object is created
            }
            KASAlbumViewHandler.prototype.addImageObjects = function (imageObjects) {
                this.model.imageObjects.push.apply(this.model.imageObjects, imageObjects);
                this.refreshAlbumView();
            };
            KASAlbumViewHandler.prototype.addImageLocalPaths = function (imageLocalPaths) {
                this.model.imageLocalPaths.push.apply(this.model.imageLocalPaths, imageLocalPaths);
                this.refreshAlbumView();
            };
            KASAlbumViewHandler.prototype.removeLocalPaths = function (indices) {
                if (!this.model.hasStaticContent) {
                    this.model.imageObjects = this.model.imageObjects.filter(function (el, i) { return indices.indexOf(i) < 0; });
                }
                else {
                    this.model.imageObjects = this.model.imageObjects.filter(function (el, i) { return indices.indexOf(i) < 0; });
                }
                this.refreshData(this.model);
                this.refreshAlbumView();
            };
            KASAlbumViewHandler.prototype.refreshAlbumView = function () {
                this.refreshData(this.model);
                this.view.refreshView();
            };
            KASAlbumViewHandler.prototype.populateLocalImagePathsInModel = function (albumViewModel) {
                if (!this.model.hasStaticContent) {
                    this.model.imageLocalPaths = [];
                    for (var i = 0; i < albumViewModel.imageObjects.length; i++) {
                        this.model.imageLocalPaths.push(this.model.imageObjects[i].localPath);
                    }
                }
            };
            KASAlbumViewHandler.prototype.refreshData = function (model) {
                this.populateLocalImagePathsInModel(model);
                this.view.imageLocalPaths = this.model.imageLocalPaths;
            };
            KASAlbumViewHandler.prototype.getAlbumView = function () {
                this.refreshData(this.model);
                if (this.model.allLocalPathsAvailable) {
                    this.view.showViewForLocalImages();
                    if (!this.model.hasStaticContent) {
                        if (this.model.isOutgoing) {
                            if (this.model.allServerPathsAvailable && this.model.messageSendStatus != 2) {
                            }
                            else {
                                if (this.model.showLoadingWhileUploads)
                                    this.view.showLoadingIndicator();
                            }
                        }
                        else {
                        }
                    }
                }
                else {
                    if (!this.model.isOutgoing) {
                        this.view.showThumbnail();
                        if (this.model.isAutoDownloadEnabled) {
                            this.onDownloadTriggered();
                        }
                        else {
                            // read isDownloading from native
                            if (this.model.isDownloading) {
                                this.onDownloadTriggered();
                            }
                            else {
                                this.view.showTapToDownloadView();
                            }
                        }
                    }
                }
                return this.view.getView();
            };
            KASAlbumViewHandler.prototype.getAttachmentsWithoutLocalPath = function () {
                var objs = [];
                for (var i = 0; i < this.model.imageObjects.length; i++) {
                    var obj = this.model.imageObjects[i];
                    if (!KASClient.KASAttachment.hasLocalPath(obj) && KASClient.KASAttachment.hasServerPath(obj)) {
                        objs.push(obj.attachmentId);
                    }
                }
                return objs;
            };
            KASAlbumViewHandler.prototype.onDownloadFinished = function (downloadedAttachment, error) {
                if (error) {
                    this.view.showRetryButton();
                }
                else {
                    KASClient.logToReportNative("Logging from onDownloadFinished, serverPath - " + downloadedAttachment.serverPath + ", localPath - " + downloadedAttachment.localPath);
                    for (var i = 0; i < this.model.imageObjects.length; i++) {
                        var imageObject = this.model.imageObjects[i];
                        if (imageObject.serverPath == downloadedAttachment.serverPath) {
                            imageObject.localPath = downloadedAttachment.localPath; // TEST
                            break;
                        }
                    }
                    // if all downloaded, remove loading indicator
                    if (this.allLocalPathsExist()) {
                        this.model.allLocalPathsAvailable = true;
                        this.refreshData(this.model);
                        this.view.refreshView();
                        if (this.downloadFinishedCallback) {
                            this.downloadFinishedCallback();
                        }
                    }
                }
            };
            KASAlbumViewHandler.prototype.allLocalPathsExist = function () {
                var allExists = true;
                for (var i = 0; i < this.model.imageObjects.length; i++) {
                    var imageObject = this.model.imageObjects[i];
                    if (imageObject.localPath == "") {
                        allExists = false;
                        break;
                    }
                }
                return allExists;
            };
            KASAlbumViewHandler.prototype.onUploadFinished = function () {
            };
            KASAlbumViewHandler.prototype.onUploadFailed = function () {
            };
            KASAlbumViewHandler.prototype.onDownloadStopped = function () {
                this.model.imageObjects.forEach(function (element) {
                    KASClient.App.cancelAttachmentDownloadAsync(element, null);
                });
            };
            KASAlbumViewHandler.prototype.onDownloadFailed = function () {
                this.view.showRetryButton();
            };
            KASAlbumViewHandler.prototype.retryButtonTapped = function () {
                this.onDownloadTriggered();
            };
            KASAlbumViewHandler.prototype.imageRemoved = function (index) {
                this.removeLocalPaths([index]);
                if (this.view.imageLocalPaths.length > 1)
                    this.view.showSlide(index - 1);
                if (this.removeImageFromAlbumCallback) {
                    this.removeImageFromAlbumCallback(index);
                }
            };
            KASAlbumViewHandler.prototype.onDownloadTriggered = function () {
                KASClient.App.hasStorageAccessForAttachmentType(KASClient.KASAttachmentType.Image, function (hasAccess, error) {
                    if (hasAccess) {
                        this.view.showLoadingIndicator();
                        this.startDownloadForImagesForAttachment(null);
                    }
                }.bind(this));
            };
            KASAlbumViewHandler.prototype.onImageTappedAtIndex = function (imgIndex) {
                KASClient.App.showImageImmersiveView(this.view.imageLocalPaths, imgIndex);
            };
            KASAlbumViewHandler.prototype.startDownloadForImagesForAttachment = function (callback) {
                var downloadCallBack = callback;
                if (callback == null || callback == undefined) {
                    downloadCallBack = function (downloadedAttachment, error) {
                        this.onDownloadFinished(downloadedAttachment, error);
                    }.bind(this);
                }
                this.model.imageObjects.forEach(function (element) {
                    if (element.localPath == "" && element.serverPath != "") {
                        KASClient.App.downloadAttachmentAsync(element, downloadCallBack);
                    }
                });
            };
            return KASAlbumViewHandler;
        }());
        UI.KASAlbumViewHandler = KASAlbumViewHandler;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASAudioView = (function (_super) {
            __extends(KASAudioView, _super);
            function KASAudioView(audio) {
                var _this = _super.call(this) || this;
                _this.audioObj = null;
                _this.audioDiv = null;
                _this.thumbnailView = null;
                _this.view.style.position = "relative";
                _this.audioObj = audio;
                _this.thumbnailView = new UI.KASAttachmentThumbnailView();
                return _this;
            }
            KASAudioView.prototype.refreshView = function () {
                this.populateView(this.audioObj);
            };
            KASAudioView.prototype.showViewForAudio = function () {
                this.populateView(this.audioObj);
            };
            KASAudioView.prototype.showTapToDownloadView = function () {
                KASClient.UI.clearElement(this.thumbnailView.containerDiv);
                this.thumbnailView.containerDiv.style.height = "40px";
                this.addTapToDownloadButtonToDiv(this.thumbnailView.containerDiv);
            };
            KASAudioView.prototype.showLoadingIndicator = function () {
                KASClient.UI.clearElement(this.thumbnailView.containerDiv);
                this.thumbnailView.containerDiv.style.height = "25px";
                this.addLoadingIndicatorToDiv(this.thumbnailView.containerDiv);
            };
            KASAudioView.prototype.showRetryButton = function () {
                KASClient.UI.clearElement(this.thumbnailView.containerDiv);
                this.thumbnailView.containerDiv.style.height = "40px";
                this.addRetryButtonToDiv(this.thumbnailView.containerDiv);
            };
            KASAudioView.prototype.populateView = function (obj) {
                if (this.tapEnabled) {
                    this.thumbnailView.onTappedCallback = this.onTappedCallback;
                }
                if (this.shouldShowRemoveButton) {
                    this.thumbnailView.removeBtnCallback = this.removeBtnCallback;
                }
                KASClient.UI.clearElement(this.view);
                this.audioDiv = this.thumbnailView.getView(obj.fileName, obj.type, obj.size);
                var playBtn = KASClient.UI.getBase64Image(UI.Assets.audioPlay, { "width": "35px", "height": "35px", "display": "block", "margin": "auto" });
                if (this.tapEnabled) {
                    this.thumbnailView.containerDiv.style.paddingTop = "5px";
                    KASClient.UI.addElement(playBtn, this.thumbnailView.containerDiv);
                }
                if (this.shouldShowRemoveButton) {
                    this.addRemoveButton();
                }
                KASClient.UI.addElement(this.audioDiv, this.view);
            };
            KASAudioView.prototype.getLoadingViewAttributes = function (pictureUrl) {
                var attr = _super.prototype.getLoadingViewAttributes.call(this, pictureUrl);
                attr["width"] = "25px";
                attr["height"] = "25px";
                return attr;
            };
            KASAudioView.prototype.addRemoveButton = function () {
                var btn = KASClient.UI.getBase64Image(UI.Assets.crossButtonBlack, {
                    "position": "absolute",
                    "right": "-6px",
                    "top": "-6px",
                    "width": "16px",
                    "height": "16px"
                });
                KASClient.UI.addElement(btn, this.audioDiv);
                UI.setAccessibilityBasic(btn, false, UI.KASFormAccessibilityRole.Button, KASClient.Internal.getKASClientString("RemoveText") + " - " + KASClient.Internal.getKASClientString("TapToRemoveText", KASClient.Internal.getKASClientString("KASAttachmentAudioText")));
                if (this.removeBtnCallback) {
                    btn.onclick = this.removeBtnCallback;
                }
            };
            KASAudioView.prototype.getBlurViewAttributes = function () {
                var attr = _super.prototype.getBlurViewAttributes.call(this);
                attr["margin"] = "0";
                return attr;
            };
            KASAudioView.prototype.getAudioPlayerView = function () {
                var player = KASClient.UI.getElement("audio", { "width": "100%", "height": "40px" });
                player.controls = true;
                player.src = this.audioObj.localPath;
                return player;
            };
            KASAudioView.prototype.showAudioPlayer = function () {
                var player = this.getAudioPlayerView();
                player.play();
                KASClient.UI.clearElement(this.thumbnailView.containerDiv);
                KASClient.UI.addElement(player, this.thumbnailView.containerDiv);
            };
            return KASAudioView;
        }(UI.KASAttachmentView));
        UI.KASAudioView = KASAudioView;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASAudioViewHandler = (function () {
            function KASAudioViewHandler(audioViewModel) {
                this.model = audioViewModel;
                this.view = new UI.KASAudioView(this.model.audioObj);
                this.view.retryButtonCallback = function () { this.retryButtonTapped(); }.bind(this);
                this.view.onTappedCallback = function () { this.onaudioTapped(); }.bind(this);
                this.view.shouldShowRemoveButton = this.model.showRemoveButton;
                this.view.removeBtnCallback = function () { this.audioRemoved(); }.bind(this);
                this.view.tapEnabled = this.model.enableOnTap;
            }
            KASAudioViewHandler.prototype.refreshaudioView = function () {
                this.view.audioObj = this.model.audioObj;
                this.view.refreshView();
            };
            KASAudioViewHandler.prototype.getAudioView = function () {
                this.view.audioObj = this.model.audioObj;
                this.view.showViewForAudio();
                if (KASClient.KASAttachment.hasLocalPath(this.model.audioObj)) {
                    if (!this.model.hasStaticContent) {
                        if (this.model.isOutgoing) {
                            if (KASClient.KASAttachment.hasLocalPath(this.model.audioObj) && this.model.messageSendStatus != 2) {
                            }
                            else {
                                this.view.showLoadingIndicator();
                            }
                        }
                        else {
                        }
                    }
                }
                else {
                    if (!this.model.isOutgoing) {
                        if (this.model.isAutoDownloadEnabled) {
                            this.onDownloadTriggered();
                        }
                        else {
                            if (this.model.isDownloading) {
                                this.onDownloadTriggered();
                            }
                            else {
                                this.view.showTapToDownloadView();
                            }
                        }
                    }
                }
                return this.view.getView();
            };
            KASAudioViewHandler.prototype.audioRemoved = function () {
                this.model.audioObj = null;
                this.view.audioObj = null;
                if (this.audioRemovedCallback) {
                    this.audioRemovedCallback();
                }
            };
            KASAudioViewHandler.prototype.onDownloadFinished = function (downloadedAttachment, error) {
                if (error) {
                }
                else {
                    var attachmentShown = this.model.audioObj;
                    if (attachmentShown.serverPath == downloadedAttachment.serverPath) {
                        attachmentShown.localPath = downloadedAttachment.localPath;
                    }
                    // if all downloaded, remove loading indicator
                    if (this.allLocalPathsExist()) {
                        this.model.allLocalPathsAvailable = true;
                        this.view.audioObj = this.model.audioObj;
                        this.view.refreshView();
                        if (this.downloadFinishedCallback) {
                            this.downloadFinishedCallback();
                        }
                    }
                }
            };
            // should use array of missing local paths ?
            KASAudioViewHandler.prototype.allLocalPathsExist = function () {
                return KASClient.KASAttachment.hasLocalPath(this.model.audioObj);
            };
            KASAudioViewHandler.prototype.onUploadFinished = function () {
            };
            KASAudioViewHandler.prototype.onUploadFailed = function () {
            };
            KASAudioViewHandler.prototype.onDownloadStopped = function () {
                KASClient.App.cancelAttachmentDownloadAsync(this.model.audioObj, null);
            };
            KASAudioViewHandler.prototype.onDownloadFailed = function () {
                this.view.showRetryButton();
            };
            KASAudioViewHandler.prototype.onaudioTapped = function () {
                var docTapped = this.model.audioObj;
                if (KASClient.KASAttachment.hasLocalPath(docTapped)) {
                    this.view.onTappedCallback = null;
                    this.view.showAudioPlayer();
                }
                else {
                    this.onDownloadTriggered();
                }
            };
            KASAudioViewHandler.prototype.retryButtonTapped = function () {
                this.onDownloadTriggered();
            };
            KASAudioViewHandler.prototype.onDownloadTriggered = function () {
                KASClient.App.hasStorageAccessForAttachmentType(KASClient.KASAttachmentType.Audio, function (hasAccess, error) {
                    if (hasAccess) {
                        this.view.showLoadingIndicator();
                        this.startDownloadForaudio(null);
                    }
                }.bind(this));
            };
            KASAudioViewHandler.prototype.startDownloadForaudio = function (callback) {
                var downloadCallBack = callback;
                if (callback == null) {
                    downloadCallBack = function (downloadedAttachment, error) {
                        this.onDownloadFinished(downloadedAttachment, error);
                    }.bind(this);
                }
                if (!KASClient.KASAttachment.hasLocalPath(this.model.audioObj)) {
                    KASClient.App.downloadAttachmentAsync(this.model.audioObj, downloadCallBack);
                }
            };
            return KASAudioViewHandler;
        }());
        UI.KASAudioViewHandler = KASAudioViewHandler;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASCheckboxView = (function () {
            function KASCheckboxView(title, isChecked, checkedChangedCallback) {
                this.title = "";
                this.checkedChangedCallback = null;
                this.checkboxInput = null;
                this.checkboxDefaultValue = false;
                this.view = null;
                //Accessibility
                this.accessibilityAttributes = {};
                this.title = title;
                this.checkedChangedCallback = checkedChangedCallback;
                this.checkboxDefaultValue = isChecked;
            }
            KASCheckboxView.prototype.getView = function () {
                var settingView = KASClient.UI.getElement("div", { "height": "48px", "margin": "0", "display": "flex", "flex-direction": "row", "align-items": "center" });
                settingView.onclick = function () {
                    this.checkboxInput.click();
                    KASClient.UI.setAccessibilityAttribute(settingView, KASClient.UI.KASFormAccessibilityKey.Checked, this.isChecked());
                }.bind(this, settingView);
                KASClient.UI.setAccessibilityBasic(settingView, false, KASClient.UI.KASFormAccessibilityRole.Checkbox);
                KASClient.UI.setAccessibilityAttribute(settingView, KASClient.UI.KASFormAccessibilityKey.Checked, "" + this.checkboxDefaultValue);
                var titleLabelAttributes = {
                    "flex": "1",
                    "color": "#32485f",
                    "font-size": KASClient.UI.getScaledFontSize("14px")
                };
                var titleLabel = KASClient.UI.getElement("label", titleLabelAttributes);
                titleLabel.innerText = this.title;
                KASClient.UI.addElement(titleLabel, settingView);
                // Checkbox view
                this.checkboxInput = KASClient.UI.getElement("input");
                this.checkboxInput.type = "checkbox";
                this.checkboxInput.checked = this.checkboxDefaultValue;
                this.checkboxInput.onclick = function (event) {
                    event.stopPropagation();
                };
                this.checkboxInput.onchange = function (event) {
                    this.checkedChangedCallback(this.isChecked());
                }.bind(this);
                KASClient.UI.addElement(this.checkboxInput, settingView);
                for (var key in this.accessibilityAttributes) {
                    UI.setAccessibilityAttribute(settingView, key, this.accessibilityAttributes[key]);
                }
                this.view = settingView;
                return settingView;
            };
            KASCheckboxView.prototype.isChecked = function () {
                return this.checkboxInput.checked;
            };
            KASCheckboxView.prototype.setAccessibilityAttribute = function (key, value) {
                if (this.view != null) {
                    UI.setAccessibilityAttribute(this.view, key, value);
                }
                this.accessibilityAttributes[key] = value;
            };
            return KASCheckboxView;
        }());
        UI.KASCheckboxView = KASCheckboxView;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASInputView = (function () {
            function KASInputView(header) {
                this.header = null;
                this.header = header;
            }
            KASInputView.prototype.getView = function () {
                var headerDiv = UI.getLabel(this.header, {
                    "font-size": KASClient.UI.getScaledFontSize("12px"),
                    "font-weight": "600",
                    "color": "#32485f",
                });
                UI.setAccessibilityBasic(headerDiv, false /*isHidden*/);
                return UI.getVerticalDiv([headerDiv, UI.getSpace("12px"), this.getInputView()], {
                    "position": "relative",
                    "top": "0",
                    "left": "0",
                    "padding": "8px 16px"
                });
            };
            return KASInputView;
        }());
        UI.KASInputView = KASInputView;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
/// <reference path="./KASInputView.ts" />
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASDateInputView = (function (_super) {
            __extends(KASDateInputView, _super);
            /**
             *
             * @param header Header text of input view
             * @param date Default date, In case of null place will be shown.
             * @param placeHolder Placeholder text, In case of null current date will be shown
             */
            function KASDateInputView(header, date, placeHolder, dateChangeCallback) {
                if (date === void 0) { date = null; }
                if (placeHolder === void 0) { placeHolder = null; }
                if (dateChangeCallback === void 0) { dateChangeCallback = null; }
                var _this = _super.call(this, header) || this;
                _this.date = null;
                _this.placeHolder = null;
                _this.date = date;
                _this.placeHolder = placeHolder;
                _this.dateChangeCallback = dateChangeCallback;
                return _this;
            }
            KASDateInputView.prototype.getInputView = function () {
                var inputView = KASClient.UI.getElement("div", {
                    "padding-bottom": "8px",
                    "border-bottom": "0.5px solid #6f7e8f",
                    "display": "flex",
                    "flex-direction": "column"
                });
                var dateText;
                if (this.date != null) {
                    dateText = KASClient.getDateString(this.date, true, false);
                }
                else if (this.placeHolder != null) {
                    dateText = this.placeHolder;
                }
                else {
                    var date = new Date();
                    date.setUTCHours(0, 0, 0, 0);
                    dateText = KASClient.getDateString(date, true, false);
                }
                var dateTextLabel = KASClient.UI.getLabel(dateText, {
                    "flex": "1",
                    "font-size": KASClient.UI.getScaledFontSize("16px"),
                    "color": "#006ff1",
                });
                KASClient.UI.setAccessibilityBasic(dateTextLabel, false, KASClient.UI.KASFormAccessibilityRole.Text);
                this.datePicker = KASClient.UI.getElement("input", {
                    "-webkit-appearance": "none",
                    "border": "none",
                    "background": "transparent",
                    "color": "transparent",
                    "width": "1px",
                    "height": "1px"
                });
                this.datePicker.type = "date";
                KASClient.UI.setAccessibilityBasic(this.datePicker, true);
                this.datePicker.onchange = function () {
                    if (this.invalidDate()) {
                        this.datePicker.valueAsNumber = new Date().getTime();
                    }
                    this.date = new Date(this.datePicker.valueAsNumber);
                    KASClient.UI.setText(dateTextLabel, KASClient.getDateString(this.date, true, false));
                    if (this.dateChangeCallback) {
                        this.dateChangeCallback(this.datePicker.valueAsNumber);
                    }
                }.bind(this);
                dateTextLabel.onclick = function () {
                    if (KASClient.getPlatform() == KASClient.Platform.Android) {
                        this.datePicker.click();
                    }
                    else {
                        this.datePicker.focus();
                    }
                }.bind(this);
                var dueDateView = KASClient.UI.getHorizontalDiv([dateTextLabel, this.datePicker]);
                KASClient.UI.addElement(dueDateView, inputView);
                return inputView;
            };
            KASDateInputView.prototype.invalidDate = function () {
                return (this.datePicker.value == null || this.datePicker.value == "" ||
                    this.datePicker.valueAsNumber < this.getCurrentDateWithoutTime());
            };
            KASDateInputView.prototype.getDate = function () {
                if (this.invalidDate()) {
                    return this.getCurrentDateWithoutTime();
                }
                return this.datePicker.valueAsNumber;
            };
            KASDateInputView.prototype.getCurrentDateWithoutTime = function () {
                var date = new Date();
                date.setUTCHours(0, 0, 0, 0);
                return date.getTime();
            };
            return KASDateInputView;
        }(UI.KASInputView));
        UI.KASDateInputView = KASDateInputView;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
/// <reference path="./KASInputView.ts" />
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASTimeInputView = (function (_super) {
            __extends(KASTimeInputView, _super);
            /**
             *
             * @param header Header text of input view
             * @param Default Time in minutes, In case of null place will be shown
             * @param placeHolder Placeholder text, In case of null current time will be shown
             */
            function KASTimeInputView(header, time, placeHolder, timeChangeCallback, minTime, defaultTime) {
                if (placeHolder === void 0) { placeHolder = null; }
                if (timeChangeCallback === void 0) { timeChangeCallback = null; }
                var _this = _super.call(this, header) || this;
                _this.hour = null;
                _this.minute = null;
                _this.placeHolder = null;
                _this.use24HourFormat = false;
                time = time % 1440;
                _this.hour = parseInt("" + time / 24);
                _this.minute = time % 60;
                _this.placeHolder = placeHolder;
                _this.timeChangeCallback = timeChangeCallback;
                _this.minTime = minTime;
                _this.defaultTime = defaultTime;
                return _this;
            }
            KASTimeInputView.prototype.getInputView = function () {
                var inputView = KASClient.UI.getElement("div", {
                    "padding-bottom": "8px",
                    "border-bottom": "0.5px solid #6f7e8f",
                    "display": "flex",
                    "flex-direction": "column"
                });
                var timeText;
                if (this.hour != null && this.minute != null) {
                    timeText = this.getTimeString(this.hour, this.minute);
                }
                else if (this.placeHolder != null) {
                    timeText = this.placeHolder;
                }
                else {
                    var date = new Date();
                    timeText = this.getTimeString(date.getHours(), date.getMinutes());
                }
                var timeTextLabel = KASClient.UI.getLabel(timeText, {
                    "flex": "1",
                    "font-size": KASClient.UI.getScaledFontSize("16px"),
                    "color": "#006ff1",
                });
                KASClient.UI.setAccessibilityBasic(timeTextLabel, false, KASClient.UI.KASFormAccessibilityRole.Text);
                this.timePicker = KASClient.UI.getElement("input", {
                    "-webkit-appearance": "none",
                    "border": "none",
                    "background": "transparent",
                    "color": "transparent",
                    "width": "1px",
                    "height": "1px"
                });
                this.timePicker.type = "time";
                KASClient.UI.setAccessibilityBasic(this.timePicker, true);
                this.timePicker.onchange = function () {
                    if (isNaN(this.timePicker.valueAsNumber)) {
                        this.timePicker.valueAsNumber = new Date().getTime();
                    }
                    var inMin = this.timePicker.valueAsNumber / 60000;
                    this.time = parseInt("" + inMin / 60);
                    this.minute = inMin % 60;
                    KASClient.UI.setText(timeTextLabel, this.getTimeString(this.time, this.minute));
                    if (this.timeChangeCallback) {
                        this.timeChangeCallback(this.timePicker.valueAsNumber - new Date().getTime());
                    }
                }.bind(this);
                timeTextLabel.onclick = function () {
                    if (KASClient.getPlatform() == KASClient.Platform.Android) {
                        this.timePicker.click();
                    }
                    else {
                        this.timePicker.focus();
                    }
                }.bind(this);
                var dueDateView = KASClient.UI.getHorizontalDiv([timeTextLabel, this.timePicker]);
                KASClient.UI.addElement(dueDateView, inputView);
                return inputView;
            };
            KASTimeInputView.prototype.getTimeString = function (hour, minute) {
                var inMin = this.minTime / 60000;
                var minHour = parseInt("" + inMin / 60);
                var minMin = inMin % 60;
                inMin = this.defaultTime / 60000;
                var defaultHour = parseInt("" + inMin / 60);
                var defaultMin = inMin % 60;
                if (hour < minHour || (hour === minHour && minute < minMin)) {
                    hour = defaultHour;
                    minute = defaultMin;
                }
                var min = (minute < 10 ? "0" : "") + minute;
                if (this.use24HourFormat) {
                    return hour + ":" + min;
                }
                else {
                    var hr = hour % 12;
                    hr = (hr == 0 ? 12 : hr);
                    return hr + ":" + min + " " + (parseInt("" + hour / 12) ? "pm" : "am");
                }
            };
            KASTimeInputView.prototype.getTime = function () {
                var selectedTime = this.defaultTime;
                if (!isNaN(this.timePicker.valueAsNumber) && this.timePicker.valueAsNumber > this.minTime) {
                    selectedTime = this.timePicker.valueAsNumber;
                }
                return selectedTime;
            };
            return KASTimeInputView;
        }(UI.KASInputView));
        UI.KASTimeInputView = KASTimeInputView;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASDocumentView = (function (_super) {
            __extends(KASDocumentView, _super);
            function KASDocumentView(documentObj2) {
                var _this = _super.call(this) || this;
                _this.documentObj = null;
                _this.documentDiv = null;
                _this.thumbnailView = null;
                _this.view.style.position = "relative";
                _this.documentObj = documentObj2;
                _this.thumbnailView = new UI.KASAttachmentThumbnailView();
                return _this;
            }
            KASDocumentView.prototype.refreshView = function () {
                this.populateView(this.documentObj);
            };
            KASDocumentView.prototype.showViewForDocument = function () {
                this.populateView(this.documentObj);
            };
            KASDocumentView.prototype.showTapToDownloadView = function () {
                this.addTapToDownloadButtonToDiv(this.view);
            };
            KASDocumentView.prototype.populateView = function (obj) {
                if (this.tapEnabled) {
                    this.thumbnailView.onTappedCallback = this.onTappedCallback;
                }
                if (this.shouldShowRemoveButton) {
                    this.thumbnailView.removeBtnCallback = this.removeBtnCallback;
                }
                KASClient.UI.clearElement(this.view);
                this.documentDiv = this.thumbnailView.getView(obj.fileName, obj.type, obj.size);
                if (this.shouldShowRemoveButton) {
                    this.addRemoveButton();
                }
                KASClient.UI.addElement(this.documentDiv, this.view);
            };
            KASDocumentView.prototype.getLoadingViewAttributes = function (pictureUrl) {
                var attr = _super.prototype.getLoadingViewAttributes.call(this, pictureUrl);
                attr["width"] = "25px";
                attr["height"] = "25px";
                return attr;
            };
            KASDocumentView.prototype.addRemoveButton = function () {
                var btn = KASClient.UI.getBase64Image(UI.Assets.crossButtonBlack, {
                    "position": "absolute",
                    "right": "-6px",
                    "top": "-6px",
                    "width": "16px",
                    "height": "16px"
                });
                KASClient.UI.addElement(btn, this.documentDiv);
                if (this.removeBtnCallback) {
                    UI.setAccessibilityBasic(btn, false, UI.KASFormAccessibilityRole.Button, KASClient.Internal.getKASClientString("RemoveText") + " - " + KASClient.Internal.getKASClientString("TapToRemoveText", KASClient.Internal.getKASClientString("KASAttachmentDocumentText")));
                    btn.onclick = this.removeBtnCallback;
                }
            };
            KASDocumentView.prototype.getBlurViewAttributes = function () {
                var attr = _super.prototype.getBlurViewAttributes.call(this);
                attr["margin"] = "0";
                return attr;
            };
            return KASDocumentView;
        }(UI.KASAttachmentView));
        UI.KASDocumentView = KASDocumentView;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASDocumentViewHandler = (function () {
            function KASDocumentViewHandler(documentViewModel) {
                this.model = documentViewModel;
                this.view = new UI.KASDocumentView(this.model.documentObj);
                this.view.retryButtonCallback = function () { this.retryButtonTapped(); }.bind(this);
                this.view.onTappedCallback = function () { this.onDocumentTapped(); }.bind(this);
                this.view.shouldShowRemoveButton = this.model.showRemoveButton;
                this.view.removeBtnCallback = function () { this.documentRemoved(); }.bind(this);
                this.view.tapEnabled = this.model.enableOnTap;
            }
            KASDocumentViewHandler.prototype.refreshDocumentView = function () {
                this.view.documentObj = this.model.documentObj;
                this.view.refreshView();
            };
            KASDocumentViewHandler.prototype.documentRemoved = function () {
                this.model.documentObj = null;
                this.view.documentObj = null;
                if (this.documentRemovedCallback) {
                    this.documentRemovedCallback();
                }
            };
            KASDocumentViewHandler.prototype.getDocumentView = function () {
                this.view.documentObj = this.model.documentObj;
                this.view.showViewForDocument();
                if (KASClient.KASAttachment.hasLocalPath(this.model.documentObj)) {
                    if (!this.model.hasStaticContent) {
                        if (this.model.isOutgoing) {
                            if (KASClient.KASAttachment.hasLocalPath(this.model.documentObj) && this.model.messageSendStatus != 2) {
                            }
                            else {
                                this.view.showLoadingIndicator();
                            }
                        }
                        else {
                        }
                    }
                }
                else {
                    if (!this.model.isOutgoing) {
                        if (this.model.isAutoDownloadEnabled) {
                            this.onDownloadTriggered();
                        }
                        else {
                            if (this.model.isDownloading) {
                                this.onDownloadTriggered();
                            }
                            else {
                                this.view.showTapToDownloadView();
                            }
                        }
                    }
                }
                return this.view.getView();
            };
            KASDocumentViewHandler.prototype.onDownloadFinished = function (downloadedAttachment, error) {
                if (error) {
                    this.onDownloadFailed();
                }
                else {
                    var attachmentShown = this.model.documentObj;
                    if (attachmentShown.serverPath == downloadedAttachment.serverPath) {
                        attachmentShown.localPath = downloadedAttachment.localPath;
                    }
                    // if all downloaded, remove loading indicator
                    if (this.allLocalPathsExist()) {
                        this.view.documentObj = this.model.documentObj;
                        this.model.allLocalPathsAvailable = true;
                        this.view.refreshView();
                        if (this.downloadFinishedCallback) {
                            this.downloadFinishedCallback();
                        }
                    }
                }
            };
            KASDocumentViewHandler.prototype.allLocalPathsExist = function () {
                return KASClient.KASAttachment.hasLocalPath(this.model.documentObj);
            };
            KASDocumentViewHandler.prototype.onUploadFinished = function () {
            };
            KASDocumentViewHandler.prototype.onUploadFailed = function () {
            };
            KASDocumentViewHandler.prototype.onDownloadStopped = function () {
                KASClient.App.cancelAttachmentDownloadAsync(this.model.documentObj, null);
                this.view.showTapToDownloadView();
            };
            KASDocumentViewHandler.prototype.onDownloadFailed = function () {
                this.view.showRetryButton();
            };
            KASDocumentViewHandler.prototype.onDocumentTapped = function () {
                var docTapped = this.model.documentObj;
                if (KASClient.KASAttachment.hasLocalPath(docTapped))
                    KASClient.App.openAttachmentImmersiveView(this.model.documentObj);
                else {
                    this.onDownloadTriggered();
                }
            };
            KASDocumentViewHandler.prototype.retryButtonTapped = function () {
                this.onDownloadTriggered();
            };
            KASDocumentViewHandler.prototype.onDownloadTriggered = function () {
                KASClient.App.hasStorageAccessForAttachmentType(KASClient.KASAttachmentType.Document, function (hasAccess, error) {
                    if (hasAccess) {
                        this.view.showLoadingIndicator();
                        this.startDownloadForDocument(null);
                    }
                }.bind(this));
            };
            KASDocumentViewHandler.prototype.startDownloadForDocument = function (callback) {
                var downloadCallBack = callback;
                if (callback == null) {
                    downloadCallBack = function (downloadedAttachment, error) {
                        this.onDownloadFinished(downloadedAttachment, error);
                    }.bind(this);
                }
                if (!KASClient.KASAttachment.hasLocalPath(this.model.documentObj)) {
                    KASClient.App.downloadAttachmentAsync(this.model.documentObj, downloadCallBack);
                }
            };
            return KASDocumentViewHandler;
        }());
        UI.KASDocumentViewHandler = KASDocumentViewHandler;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASDropDownOptionsInputView = (function () {
            function KASDropDownOptionsInputView(placeHolder, delimiter) {
                if (delimiter === void 0) { delimiter = ","; }
                this.optionsListLI = []; // li's
                this.options = null;
                this.placeHolderText = placeHolder;
                this.optionsDelimiter = delimiter;
                this.containerView = UI.getElement("div", { "height": "auto", "margin": "0", "width": "100%" });
            }
            KASDropDownOptionsInputView.prototype.getView = function () {
                if (this.options != null && this.options != undefined) {
                    this.populateEditView();
                    for (var i = 0; i < this.options.length; i++) {
                        this.appendOptionRowForText(this.options[i].text);
                    }
                }
                else {
                    this.showDefaultView();
                }
                return this.containerView;
            };
            KASDropDownOptionsInputView.prototype.showDefaultView = function () {
                UI.removeElement(this.optionsListOL, this.containerView);
                this.placeHolderLabel = UI.getLabel(this.placeHolderText, { "padding-top": "10px", "color": "#98a3af", "font-size": "15px" });
                this.containerView.onclick = function () {
                    this.populateEditView();
                    this.showEmptyOptionsList();
                }.bind(this);
                UI.addElement(this.placeHolderLabel, this.containerView);
            };
            KASDropDownOptionsInputView.prototype.populateEditView = function () {
                if (!this.optionsListOL) {
                    UI.removeElement(this.placeHolderLabel, this.containerView);
                    this.optionsListOL = UI.getElement('ol', { "-webkit-user-select": "text" });
                    this.optionsListOL.contentEditable = "true";
                    UI.addElement(this.optionsListOL, this.containerView);
                }
            };
            KASDropDownOptionsInputView.prototype.showEmptyOptionsList = function () {
                this.showDefaultOption();
                this.optionsListLI[0].focus();
            };
            KASDropDownOptionsInputView.prototype.appendOptionRowForText = function (option) {
                var li = UI.getElement('li', { "font-size": "16px", "color": "#32485f" });
                li.innerText = option;
                this.optionsListLI.push(li);
                UI.addElement(li, this.optionsListOL);
            };
            KASDropDownOptionsInputView.prototype.showDefaultOption = function () {
                this.appendOptionRowForText(" ");
            };
            KASDropDownOptionsInputView.prototype.getOptions = function () {
                var options = [];
                if (this.optionsListOL) {
                    var optionsLI = this.optionsListOL.childNodes;
                    for (var i = 0; i < optionsLI.length; i++) {
                        var optionText = optionsLI[i].innerText.trim();
                        if (optionText) {
                            var option = new KASClient.KASQuestionOption();
                            option.id = options.length;
                            option.text = optionText;
                            options.push(option);
                        }
                    }
                }
                return options;
            };
            return KASDropDownOptionsInputView;
        }());
        UI.KASDropDownOptionsInputView = KASDropDownOptionsInputView;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASDropDownRow = (function () {
            function KASDropDownRow(text, index, isSelected) {
                if (isSelected === void 0) { isSelected = false; }
                this.text = "";
                this.isSelected = false;
                this.optionView = null;
                this.selectImage = null;
                this.view = null;
                this.index = index;
                var views = [];
                this.text = text;
                this.isSelected = isSelected;
                var textLabel = UI.getDiv({
                    "padding-left": "16px",
                    "width": "80%",
                    "font-size": "16px",
                    "color": "#32485f",
                    "padding-top": "14px",
                    "padding-bottom": "15px"
                });
                textLabel.innerText = text;
                views.push(textLabel);
                this.populateSelectImage();
                if (this.isSelected) {
                    views.push(this.selectImage);
                }
                this.optionView = UI.getHorizontalDiv(views, { "width": "100%", "border": "1px solid #f5f5f5" });
                this.optionView.onclick = function () {
                    this.onOptionTapped();
                }.bind(this);
                this.view = this.optionView;
            }
            KASDropDownRow.prototype.onOptionTapped = function () {
                this.onSelectCallBack(this.index);
            };
            KASDropDownRow.prototype.getView = function () {
                return this.optionView;
            };
            KASDropDownRow.prototype.getLabelAttributes = function () {
                var attributes = {
                    "height": "100%",
                    "width": "80%",
                    "margin": "0",
                    "display": "flex",
                    "padding-left": "20px",
                    "flex-direction": "row",
                    "line-height": "100%"
                };
                return attributes;
            };
            KASDropDownRow.prototype.showSelectedState = function () {
                if (!this.isSelected) {
                    this.isSelected = !this.isSelected;
                    this.optionView.style.background = "#f2f9ff";
                    UI.addElement(this.selectImage, this.optionView);
                }
            };
            KASDropDownRow.prototype.showUnselectedState = function () {
                if (this.isSelected) {
                    this.isSelected = !this.isSelected;
                    this.optionView.style.background = "white";
                    UI.removeElement(this.selectImage, this.view);
                }
            };
            KASDropDownRow.prototype.populateSelectImage = function () {
                this.selectImage = UI.getBase64Image(UI.Assets.dropDownTick, { "height": "18px", "width": "18px", "object-fit": "contain", "padding-right": "15px", "margin": "0" });
            };
            return KASDropDownRow;
        }());
        UI.KASDropDownRow = KASDropDownRow;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
var KASClient;
(function (KASClient) {
    var UI;
    (function (UI) {
        var KASFormDropDown = (function () {
            function KASFormDropDown(dropDownModel, headerView, footerView) {
                if (headerView === void 0) { headerView = null; }
                if (footerView === void 0) { footerView = null; }
                this.dropDownModel = null;
                this.dropDownOptionsContainerView = null;
                this.view = null;
                this.headerView = null;
                this.footerView = null;
                this.dropDownModel = dropDownModel;
                this.headerView = headerView;
                this.footerView = footerView;
            }
            KASFormDropDown.prototype.getView = function () {
                if (this.view == null) {
                    this.view = UI.getDiv(this.getViewAttributes());
                    if (this.headerView != null) {
                        UI.addElement(this.headerView, this.view);
                    }
                    else {
                        UI.addElement(this.getHeaderView(), this.view);
                    }
                    if (this.dropDownModel.isSearchEnabled) {
                        UI.addElement(this.getSearchBar(), this.view);
                    }
                    UI.addElement(this.getDropDown(), this.view);
                    if (this.footerView != null) {
                        UI.addElement(this.footerView, this.view);
                    }
                }
                return this.view;
            };
            KASFormDropDown.prototype.getHeaderView = function () {
                var headerView = UI.getLabel("SELECT", {
                    "padding-bottom": "9px",
                    "padding-left": "12px",
                    "padding-top": "8px",
                    "font-size": "12px",
                    "color": "#727d88",
                    "height": "14px"
                });
                return headerView;
            };
            KASFormDropDown.prototype.getSearchBar = function () {
                var searchTextBox = UI.getElement('input', {});
                return searchTextBox;
            };
            KASFormDropDown.prototype.getDropDown = function () {
                var options = this.dropDownModel.optionsAsStrings;
                var selectedOptions = this.dropDownModel.selectedOptionIndexes;
                this.listElements = [];
                this.dropDownOptionsContainerView = UI.getDiv({ "height": "120px", "overflow-y": "scroll", "flex": "1 1 auto" });
                for (var i = 0; i < options.length; i++) {
                    var row = new UI.KASDropDownRow(options[i], i, selectedOptions.indexOf(i) >= 0);
                    row.onSelectCallBack = function (i) { this.onOptionSelected(i); }.bind(this);
                    this.listElements.push(row);
                    UI.addElement(row.getView(), this.dropDownOptionsContainerView);
                }
                return this.dropDownOptionsContainerView;
            };
            KASFormDropDown.prototype.getViewAttributes = function () {
                var attributes = {
                    "height": "80%",
                    "background-color": "white",
                    "display": "flex",
                    "flex-flow": "column",
                    "position": "relative",
                    "margin": "10% 10% 10% 10%"
                };
                return attributes;
            };
            KASFormDropDown.prototype.onOptionSelected = function (index) {
                var alreadySelectedRowIndexes = this.dropDownModel.selectedOptionIndexes;
                var selectedRow = this.listElements[index];
                if (selectedRow.isSelected) {
                    this.dropDownModel.selectedOptionIndexes.splice(this.dropDownModel.selectedOptionIndexes.indexOf(index), 1);
                    selectedRow.showUnselectedState();
                }
                else {
                    if (!this.dropDownModel.isMutliSelect) {
                        this.unselectRows(alreadySelectedRowIndexes);
                        this.dropDownModel.selectedOptionIndexes = [];
                    }
                    this.dropDownModel.selectedOptionIndexes.push(index);
                    selectedRow.showSelectedState();
                }
                this.rowSelectCallBack(index, this.dropDownModel.optionsAsStrings[index], !selectedRow.isSelected);
            };
            KASFormDropDown.prototype.resetSelections = function () {
                this.unselectRows(this.dropDownModel.selectedOptionIndexes);
                this.dropDownModel.selectedOptionIndexes = [];
            };
            KASFormDropDown.prototype.unselectRows = function (rows) {
                for (var i = 0; i < rows.length; i++) {
                    var row = this.listElements[rows[i]];
                    row.showUnselectedState();
                }
            };
            KASFormDropDown.prototype.getSelectedOptions = function () {
                return this.dropDownModel.selectedOptionIndexes;
            };
            return KASFormDropDown;
        }());
        UI.KASFormDropDown = KASFormDropDown;
    })(UI = KASClient.UI || (KASClient.UI = {}));
})(KASClient || (KASClient = {}));
// Below lines will be executed after loading of KASClient SDK.
KASClient.Internal.setFontSizeMultiplier();
KASClient.Internal.initialiseKASClientStrings();
