import React, { useEffect, useRef, useState } from 'react'
import { Box, Spinner, Card, Alert, InputSearch, SelectableCard } from 'vtex.styleguide'

export interface IRecipe {
    title: string
    recipe: string
    SKU: number
    publishedDate: string
}

const RecipesContainer: StorefrontFunctionComponent = () => {
    const [data, setData] = useState<any>([]);

    const [selected, setSelected] = useState("");

    const cookie = "eyJhbGciOiJFUzI1NiIsImtpZCI6IjJBMkM0M0JGOTI5MTcyOUUyRjJBQzg0NDQ4MzkwQTUyMUVDQkQ3MkIiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJyb2RvbHBoby5vbGl2ZWlyYUBhY2N0Lmdsb2JhbCIsImFjY291bnQiOiJlc3RhZ2lvYWNjdCIsImF1ZGllbmNlIjoiYWRtaW4iLCJzZXNzIjoiNWRhOWZiZWItZDhhZC00NzI1LThhMTEtMDQ0MDM0ZmVjMzY1IiwiZXhwIjoxNjg1MTA4NTEzLCJ1c2VySWQiOiI2NzQ2ZGJmYi1jOGFkLTRkYjktOTMwYS1hMGU1NzhhOTBmMzUiLCJpYXQiOjE2ODUwMjIxMTMsImlzcyI6InRva2VuLWVtaXR0ZXIiLCJqdGkiOiIzMDZhN2FiMi02Njk1LTQ5NzAtOGE0MC0yMjQyZjA5MWQ4MDEifQ.O99-kXmNzZUtzFitmdmcUEdgI_9x3lhNA8GukgMQ86615ui_KRDCQGFtjGjm7WKxdHK8wc_-lvMqYLpmrv26KA";

    useEffect(() => {
        const headers = {
            VtexIdclientAutCookie: cookie
        };
        fetch('/api/dataentities/AZ/search?_fields=_all', { headers })
            .then(response => response.json())
            .then(data => {
                const filteredData = data.map((el: any) => ({
                    publishedDate: `${el.publishedDate.slice(8, 10)}/${el.publishedDate.slice(5, 7)}/${el.publishedDate.slice(0, 4)}`,
                    title: el.title,
                    recipe: el.recipe,
                    SKU: el.SKU
                }));
                setData(filteredData);
            });
    }, []);

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

    return (

        <div className="bg-muted-5 pa8">

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

            <div className="flex justify-end">
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

        </div>

    )
}

export default RecipesContainer;