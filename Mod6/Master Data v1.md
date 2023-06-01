# Consulta via API de uma entidade recém criada.

## URL
- https://estagioacct.vtexcommercestable.com.br/api/dataentities/VC/search?_fields=_all

### Return
- Sem cookie

```
{
    "Message": "Cannot read private fields"
}
```

- Com cookie

```
[
    {
        "isProduced": false,
        "name": "Fusca",
        "price": 50000.00,
        "producer": "Volkswagen",
        "releasedYear": 1950,
        "id": "9502bb8d-e38e-11ed-83ab-163993a92d45",
        "accountId": "2cbdb6bd-f41f-4855-942e-5609832b5808",
        "accountName": "estagioacct",
        "dataEntityId": "VC",
        "createdBy": "6746dbfb-c8ad-4db9-930a-a0e578a90f35",
        "createdIn": "2023-04-25T17:28:27.7753548Z",
        "updatedBy": null,
        "updatedIn": null,
        "lastInteractionBy": "6746dbfb-c8ad-4db9-930a-a0e578a90f35",
        "lastInteractionIn": "2023-04-25T17:28:27.7753548Z",
        "followers": [],
        "tags": [],
        "auto_filter": null
    }
]
```