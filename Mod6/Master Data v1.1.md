# Entidades

## TODAS AS REQUISIÇÕES NECESSITAM DO COOKIE VÁLIDO INSERIDO NO HEADER PARA FUNCIONAR

### Listar todas as receitas

- Basta fazer um GET request na url - [get](https://estagioacct.vtexcommercestable.com.br/api/dataentities/AZ/search?_fields=_all) - e o retorno esperado é algo do tipo:

```
[
    {
        "publishedDate": "2023-01-01T00:00:00+00:00",
        "recipe": "300g de teste misturados com 20ml de sorte",
        "SKU": 1,
        "title": "Teste",
        "id": "99a53eac-e433-11ed-83ab-0abe8f17debb",
        "accountId": "2cbdb6bd-f41f-4855-942e-5609832b5808",
        "accountName": "estagioacct",
        "dataEntityId": "AZ",
        "createdBy": "6746dbfb-c8ad-4db9-930a-a0e578a90f35",
        "createdIn": "2023-04-26T13:09:43.2805127Z",
        "updatedBy": null,
        "updatedIn": null,
        "lastInteractionBy": "6746dbfb-c8ad-4db9-930a-a0e578a90f35",
        "lastInteractionIn": "2023-04-26T13:09:43.2805127Z",
        "followers": [],
        "tags": [],
        "auto_filter": null
    },
    {
        "publishedDate": "2023-01-01T00:00:00+00:00",
        "recipe": "Basta misturar 200ml de água quente com o sachê inteiro e seu cappuccino está pronto.",
        "SKU": 2,
        "title": "Cappucino",
        "id": "d32127e1-e438-11ed-83ab-16af084b9d3d",
        "accountId": "2cbdb6bd-f41f-4855-942e-5609832b5808",
        "accountName": "estagioacct",
        "dataEntityId": "AZ",
        "createdBy": "6746dbfb-c8ad-4db9-930a-a0e578a90f35",
        "createdIn": "2023-04-26T13:47:05.6094021Z",
        "updatedBy": null,
        "updatedIn": null,
        "lastInteractionBy": "6746dbfb-c8ad-4db9-930a-a0e578a90f35",
        "lastInteractionIn": "2023-04-26T13:47:05.6094021Z",
        "followers": [],
        "tags": [],
        "auto_filter": null
    },
    {
        "publishedDate": "2023-01-01T00:00:00+00:00",
        "recipe": "Cortar uma abóbrinha em rodelas bem finas e adicionar uma pitada de sal e orégano. Fritar na frigideira com azeite e deixar 'secar' por poucos minutos. Agora é só saborear!",
        "SKU": 3,
        "title": "Abóbritos",
        "id": "cc9d843f-e43a-11ed-83ab-16f94855e18d",
        "accountId": "2cbdb6bd-f41f-4855-942e-5609832b5808",
        "accountName": "estagioacct",
        "dataEntityId": "AZ",
        "createdBy": "6746dbfb-c8ad-4db9-930a-a0e578a90f35",
        "createdIn": "2023-04-26T14:01:14.9707044Z",
        "updatedBy": null,
        "updatedIn": null,
        "lastInteractionBy": "6746dbfb-c8ad-4db9-930a-a0e578a90f35",
        "lastInteractionIn": "2023-04-26T14:01:14.9707044Z",
        "followers": [],
        "tags": [],
        "auto_filter": null
    }
]
```

### Cadastrar uma receita

- Basta fazer um POST request na url - [post](https://estagioacct.vtexcommercestable.com.br/api/dataentities/AZ/documents) - com o body em JSON preenchido com as variáveis publishedDate, recipe, SKU e title.

Exemplo do body:

```
{
    "publishedDate": "2023-01-01T00:00:00+00:00",
    "recipe": "Cortar uma abóbrinha em rodelas bem finas e adicionar uma pitada de sal e orégano. Fritar na frigideira com azeite e deixar 'secar' por poucos minutos. Agora é só saborear!",
    "SKU": 3,
    "title": "Abóbritos"
}
```

Retorno esperado:

```
{
    "Id": "AZ-cc9d843f-e43a-11ed-83ab-16f94855e18d",
    "Href": "http://estagioacct.vtexcommercestable.com.br/api/dataentities/AZ/documents/cc9d843f-e43a-11ed-83ab-16f94855e18d",
    "DocumentId": "cc9d843f-e43a-11ed-83ab-16f94855e18d"
}
```

### Deletar uma receita

- Basta fazer um DELETE request na url - [del](https://estagioacct.vtexcommercestable.com.br/api/dataentities/AZ/documents/:id) - com a variável id preenchida nos parâmetros / path variables. Nesse caso não há retorno no formato JSON, apenas um status 204 em caso de sucesso.

---

> O trigger cadastrado realiza o envio de uma notificação simples ao meu e-mail sempre que uma receita é deletada.

![trigger](https://i.ibb.co/qMrsD44/trigger.png)