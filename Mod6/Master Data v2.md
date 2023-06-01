# Entidades

## TODAS AS REQUISIÇÕES NECESSITAM DO COOKIE VÁLIDO INSERIDO NO HEADER PARA FUNCIONAR

![postman](https://i.ibb.co/9sFLFCb/mdv2.png)

### Schema JSON

```
[
    {
        "name": "mdv1",
        "schema": {
            "properties": {
                "recipe": {
                    "type": "string",
                    "maxLength": 750,
                    "title": "Conteúdo da receita"
                },
                "title": {
                    "type": "string",
                    "maxLength": 50,
                    "title": "Título da receita"
                },
                "SKU": {
                    "type": "integer",
                    "title": "SKU da receita"
                },
                "publishedDate": {
                    "type": "string",
                    "format": "date-time",
                    "title": "Data da publicação"
                }
            },
            "required": [
                "recipe",
                "title",
                "SKU",
                "publishedDate"
            ],
            "v-indexed": [
                "publishedDate",
                "recipe",
                "SKU",
                "title",
                "id",
                "accountName",
                "dataEntityId",
                "createdBy",
                "createdIn",
                "updatedBy",
                "updatedIn",
                "lastInteractionBy",
                "lastInteractionIn",
                "followers",
                "tags"
            ],
            "v-triggers": [
                {
                    "name": "rod-trigger",
                    "active": true,
                    "condition": "operation=delete",
                    "action": {
                        "type": "email",
                        "provider": "default",
                        "subject": "Receita deletada",
                        "to": [
                            "rodolpho.oliveira@acct.global"
                        ],
                        "bcc": [
                            "myemail@test.com"
                        ],
                        "replyTo": "noreply@company.com",
                        "body": "Uma receita contida no acrônimo AZ foi deletada."
                    },
                    "retry": {
                        "times": 5,
                        "delay": {
                            "addMinutes": 15
                        }
                    }
                }
            ],
            "v-default-fields": [
                "recipe",
                "title",
                "SKU",
                "publishedDate"
            ]
        }
    },
    {
        "name": "mdv1",
        "schema": {
            "properties": {
                "id": {
                    "type": "string",
                    "maxLength": 100,
                    "title": "Document ID"
                },
                "followers": {
                    "type": "string",
                    "title": "Followers"
                },
                "auto_filter": {
                    "type": "string",
                    "title": "Automatic filter"
                },
                "recipe": {
                    "type": "string",
                    "maxLength": 750,
                    "title": "Conteúdo da receita"
                },
                "createdIn": {
                    "type": "string",
                    "format": "date-time",
                    "title": "Created on"
                },
                "title": {
                    "type": "string",
                    "maxLength": 50,
                    "title": "Título da receita"
                },
                "tags": {
                    "type": "string",
                    "title": "Tags"
                },
                "dataEntityId": {
                    "type": "string",
                    "maxLength": 10,
                    "title": "Data entity"
                },
                "accountId": {
                    "type": "string",
                    "maxLength": 50,
                    "title": "Store ID"
                },
                "updatedIn": {
                    "type": "string",
                    "format": "date-time",
                    "title": "Updated on"
                },
                "lastInteractionIn": {
                    "type": "string",
                    "format": "date-time",
                    "title": "Last interaction on"
                },
                "SKU": {
                    "type": "integer",
                    "title": "SKU da receita"
                },
                "accountName": {
                    "type": "string",
                    "maxLength": 100,
                    "title": "Store name"
                },
                "publishedDate": {
                    "type": "string",
                    "format": "date-time",
                    "title": "Data da publicação"
                }
            },
            "required": [
                "id",
                "accountId",
                "accountName",
                "dataEntityId"
            ],
            "v-indexed": [
                "publishedDate",
                "recipe",
                "SKU",
                "title",
                "id",
                "accountName",
                "dataEntityId",
                "createdBy",
                "createdIn",
                "updatedBy",
                "updatedIn",
                "lastInteractionBy",
                "lastInteractionIn",
                "followers",
                "tags"
            ]
        }
    }
]
```

### Listar todas as receitas

- Basta fazer um GET request na url - [get](https://estagioacct.vtexcommercestable.com.br/api/dataentities/AZ/search) - e o retorno esperado é algo do tipo:

```
[
    {
        "id": "cc9d843f-e43a-11ed-83ab-16f94855e18d",
        "accountId": "2cbdb6bd-f41f-4855-942e-5609832b5808",
        "accountName": "estagioacct",
        "dataEntityId": "AZ"
    },
    {
        "id": "d32127e1-e438-11ed-83ab-16af084b9d3d",
        "accountId": "2cbdb6bd-f41f-4855-942e-5609832b5808",
        "accountName": "estagioacct",
        "dataEntityId": "AZ"
    },
    {
        "id": "99a53eac-e433-11ed-83ab-0abe8f17debb",
        "accountId": "2cbdb6bd-f41f-4855-942e-5609832b5808",
        "accountName": "estagioacct",
        "dataEntityId": "AZ"
    },
    {
        "id": "e43ea5e2-e458-11ed-83ab-0ec7da0a776b",
        "accountId": "2cbdb6bd-f41f-4855-942e-5609832b5808",
        "accountName": "estagioacct",
        "dataEntityId": "AZ"
    },
    {
        "id": "26fa1297-e463-11ed-83ab-12f187c24847",
        "accountId": "2cbdb6bd-f41f-4855-942e-5609832b5808",
        "accountName": "estagioacct",
        "dataEntityId": "AZ"
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
    "Id": "AZ-e3ea5f17-e463-11ed-83ab-1623af773775",
    "Href": "http://estagioacct.vtexcommercestable.com.br/api/dataentities/AZ/documents/e3ea5f17-e463-11ed-83ab-1623af773775",
    "DocumentId": "e3ea5f17-e463-11ed-83ab-1623af773775"
}
```

### Deletar uma receita

- Basta fazer um DELETE request na url - [del](https://estagioacct.vtexcommercestable.com.br/api/dataentities/AZ/documents/:id) - com a variável id preenchida nos parâmetros / path variables. Nesse caso não há retorno no formato JSON, apenas um status 204 em caso de sucesso.

---

> O trigger cadastrado realiza o envio de uma notificação simples ao meu e-mail sempre que uma receita é deletada. Desta vez o trigger foi cadastrado via schema json supramencionado.

