import React, { useEffect, useRef, useState } from 'react'
import { Box, Spinner, Card, Alert, InputSearch, SelectableCard } from 'vtex.styleguide'
import { useProduct } from 'vtex.product-context'

export interface IRecipe {
    title: string
    recipe: string
    SKU: number
    publishedDate: string
}

export interface IData {
    SKU: number
    accountId: string
    accountName: string
    auto_filter: null
    createdBy: string
    createdIn: string
    dataEntityId: string
    followers: []
    id: string
    lastInteractionBy: string
    lastInteractionIn: string
    publishedDate: string
    recipe: string
    tags: []
    title: string
    updatedBy: null | string
    updatedIn: null | string
}

const RecipesContainer: StorefrontFunctionComponent = () => {
    const productContextValue = useProduct()

    const [data, setData] = useState<any>([]);

    const [selected, setSelected] = useState("");

    const cookie = "eyJhbGciOiJFUzI1NiIsImtpZCI6Ijg5NDJCNjJEMEQ2MDI2RDA5RTA3MDMxQURFMUNDMkIyMkFGRDVBQUEiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJyb2RvbHBoby5vbGl2ZWlyYUBhY2N0Lmdsb2JhbCIsImFjY291bnQiOiJlc3RhZ2lvYWNjdCIsImF1ZGllbmNlIjoiYWRtaW4iLCJzZXNzIjoiM2FjMDNkODMtZjgwYi00NDlkLWI5NTUtMTExZTA5ZjM4OTYzIiwiZXhwIjoxNjg1MTkzOTUwLCJ1c2VySWQiOiI2NzQ2ZGJmYi1jOGFkLTRkYjktOTMwYS1hMGU1NzhhOTBmMzUiLCJpYXQiOjE2ODUxMDc1NTAsImlzcyI6InRva2VuLWVtaXR0ZXIiLCJqdGkiOiIyNWM4NmUxMi0zZDhmLTQyM2EtYTZmMC00MGI5ZjQwOWJkOWEifQ.HpKHvq9APeRVPTImy2C0PpYq9JWFU130F5pu0M6pV2VgVjAdscfqk5oyFpDT82ZyqnelTcdRY8U5t9Aua1bEpw";

    const [isSearching, setIsSearching] = useState<any>(false)

    useEffect(() => {
        const headers = {
            VtexIdclientAutCookie: cookie
        };
        fetch('/api/dataentities/AZ/search?_fields=_all', { headers })
            .then(response => response.json())
            .then(data => {
                const filteredData = data.map((el: IData) => ({
                    publishedDate: `${el.publishedDate.slice(8, 10)}/${el.publishedDate.slice(5, 7)}/${el.publishedDate.slice(0, 4)}`,
                    title: el.title,
                    recipe: el.recipe,
                    SKU: el.SKU
                }));
                setData(filteredData);
            });
    }, [isSearching]);

    const [search, setSearch] = useState("")

    const [inputAlert, setInputAlert] = useState(false)

    const sortDataByDate = () => {
        return setData((prevData: IRecipe[]) => [...prevData].sort(
            (a: IRecipe, b: IRecipe) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime()
        ));
    };

    const sortDataByTitle = () => {
        return setData((prevData: IRecipe[]) => [...prevData].sort(
            (a: IRecipe, b: IRecipe) => a.title.localeCompare(b.title)
        ));
    };

    const isSelected = (opt: string) => {
        return opt === selected
    };

    const previousValueRef = useRef("");

    const handleSearchClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        setIsSearching((prev: boolean) => !prev)
    }

    return (

        <div className="bg-muted-5 pa8">

            {productContextValue?.selectedItem ? `O id do sku acima é  ${productContextValue?.selectedItem?.itemId}` :
                <>
                    <div className="flex justify-center">

                        {
                            inputAlert ?
                                <div className="fixed bottom-0 right-0">
                                    <Alert type="error" onClose={() => setInputAlert(false)}>
                                        Para pesquisar alguma receita, o campo deve ser preenchido.
                                    </Alert>
                                </div>
                                :
                                null
                        }

                        <div className="mb8 flex justify-between mw6">

                            <button style={{ cursor: "pointer" }} className="f6 bg-white br3" onClick={handleSearchClick}>RR{isSearching}</button>

                            <InputSearch
                                placeholder="Pesquise por SKU. Ex.: 7"
                                value={search}
                                size="small"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const inputValue = e.target.value.toString();
                                    if (previousValueRef.current.length > inputValue.length) {
                                        setSearch(prevSearch => prevSearch.slice(0, -1));
                                    } else {
                                        const lastChar = inputValue[inputValue.length - 1];
                                        if (/^\d$/.test(lastChar)) {
                                            setSearch(prevSearch => prevSearch + lastChar);
                                        }
                                    }
                                    previousValueRef.current = inputValue;
                                }}
                                onSubmit={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    e.preventDefault()
                                    if (!search) {
                                        return setInputAlert(true)
                                    }
                                    setData((prevData: IRecipe[]) => prevData.filter(recipe => recipe.SKU.toString().indexOf((search)) !== -1))
                                    setSearch("")
                                }}
                            />

                        </div>

                    </div>

                    <div style={{ gap: "1rem" }} className="flex justify-end">
                        <SelectableCard
                            hasGroupRigth
                            noPadding
                            selected={isSelected('titleOrder')}
                            onClick={() => setSelected('titleOrder')}
                        >
                            <div className="pa4" onClick={() => sortDataByTitle()}>
                                <div className="f6 tc">A - Z</div>
                            </div>
                        </SelectableCard>
                        <SelectableCard
                            hasGroupRigth
                            hasGroupLeft
                            noPadding
                            selected={isSelected('dateOrder')}
                            onClick={() => setSelected('dateOrder')}
                        >
                            <div className="pa4" onClick={() => sortDataByDate()}>
                                <div className="f6 tc">DATA</div>
                            </div>
                        </SelectableCard>
                    </div>

                    <Box noPadding="false">
                        {
                            data.length > 0 ?
                                data.map((el: IRecipe, idx: number) => {
                                    const { title, recipe, SKU, publishedDate } = el
                                    return (
                                        <div key={idx} className="ma8">
                                            <Card>
                                                <h2>{title}</h2>
                                                <h4>{recipe}</h4>
                                                <div className="flex justify-between items-end">
                                                    <p className="ma0">SKU(s): {SKU}</p>
                                                    <h6 className="ma0">{publishedDate}</h6>
                                                </div>
                                            </Card>
                                        </div>
                                    )
                                })
                                :
                                <div className="flex justify-center items-center"><Spinner /></div>
                        }
                    </Box>
                </>
            }



        </div>

    )
}

export default RecipesContainer;