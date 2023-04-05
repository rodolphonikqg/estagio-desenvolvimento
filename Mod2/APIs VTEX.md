# APIs VTEX

curl --request get \
	--url https://acctglobal.vtexcommercestable.com.br/api/checkout/pub/orderForm \
	--header 'Accept: application/json' \
	--header 'Content-Type: application/json' \
	--header 'X-VTEX-API-AppKey: ' \
	--header 'X-VTEX-API-AppToken: '

```
{
    "orderFormId": "4d6eb6ccd17042a586ca2d9fc96adc12",
    "salesChannel": "1",
    "loggedIn": false,
    "isCheckedIn": false,
    "storeId": null,
    "checkedInPickupPointId": null,
    "allowManualPrice": false,
    "canEditData": true,
    "userProfileId": null,
    "userType": null,
    "ignoreProfileData": false,
    "value": 0,
    "messages": [],
    "items": [],
    "selectableGifts": [],
    "totalizers": [],
    "shippingData": null,
    "clientProfileData": {
        "email": null,
        "firstName": null,
        "lastName": null,
        "document": null,
        "documentType": null,
        "phone": null,
        "corporateName": null,
        "tradeName": null,
        "corporateDocument": null,
        "stateInscription": null,
        "corporatePhone": null,
        "isCorporate": false,
        "profileCompleteOnLoading": null,
        "profileErrorOnLoading": null,
        "customerClass": null
    },
    "paymentData": {
        "installmentOptions": [],
        "paymentSystems": [],
        "payments": [],
        "giftCards": [],
        "giftCardMessages": [],
        "availableAccounts": [],
        "availableTokens": [],
        "availableAssociations": {}
    },
    "marketingData": null,
    "sellers": [],
    "clientPreferencesData": {
        "locale": "pt-BR",
        "optinNewsLetter": null
    },
    "commercialConditionData": null,
    "storePreferencesData": {
        "countryCode": "BRA",
        "saveUserData": true,
        "timeZone": "E. South America Standard Time",
        "currencyCode": "BRL",
        "currencyLocale": 1046,
        "currencySymbol": "R$",
        "currencyFormatInfo": {
            "currencyDecimalDigits": 2,
            "currencyDecimalSeparator": ",",
            "currencyGroupSeparator": ".",
            "currencyGroupSize": 3,
            "startsWithCurrencySymbol": true
        }
    },
    "giftRegistryData": null,
    "openTextField": null,
    "invoiceData": null,
    "customData": null,
    "itemMetadata": null,
    "hooksData": null,
    "ratesAndBenefitsData": {
        "rateAndBenefitsIdentifiers": [],
        "teaser": []
    },
    "subscriptionData": null,
    "merchantContextData": null,
    "itemsOrdination": null
}
```