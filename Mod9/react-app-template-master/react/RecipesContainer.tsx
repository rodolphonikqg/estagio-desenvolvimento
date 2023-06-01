import React, { useRef, useState, useEffect } from 'react'
import { Box, Spinner, Card, Alert, InputSearch, SelectableCard } from 'vtex.styleguide'
import { useProduct } from 'vtex.product-context'
import GET_RECIPES from './GraphQL/GET_RECIPES.gql'
import { useQuery } from 'react-apollo'

export interface IRecipeField {
    key: string
    value: string
    __typename: string
}

export interface IRecipe {
    title: string
    recipe: string
    SKU: number
    publishedDate: string
    fields?: IRecipeField[]
}

interface Field {
    key: string
    value: string
    __typename: string
}

interface Document {
    fields: Field[]
    __typename: string
}

const RecipesContainer: StorefrontFunctionComponent = () => {

    const { data } = useQuery(GET_RECIPES, {
        ssr: false,
        variables: {
            account: "estagioacct",
            acronym: "AZ",
            fields: ["title", "recipe", "SKU", "publishedDate"]
        }
    })

    const productContextValue = useProduct();

    const [dataInit, setData] = useState<any>([]);

    const [isSearching, setIsSearching] = useState<boolean>(false);

    useEffect(() => {
        if (data && data.documents.length) {
            const transformedData: Record<string, string>[] = data.documents.map((document: Document) => {
                const fields: Record<string, string> = document.fields.reduce((acc: Record<string, string>, field: Field) => {
                    acc[field.key] = field.value;
                    return acc;
                }, {});

                return fields;
            });
            setData(transformedData);
        }
    }, [data, isSearching]);

    const [selected, setSelected] = useState<string>("");

    const [search, setSearch] = useState<string>("")

    const [inputAlert, setInputAlert] = useState<boolean>(false)

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

                            <button style={{ cursor: "pointer" }} className="f6 bg-white br3" onClick={handleSearchClick}>RR</button>

                            <InputSearch
                                placeholder="Pesquise por SKU. Ex.: 7"
                                value={search}
                                size="small"
                                onClear={() => setSearch("")}
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
                            dataInit?.length > 0 ?
                                dataInit?.map((el: IRecipe, idx: number) => {
                                    const { title, recipe, SKU, publishedDate } = el
                                    return (
                                        <div key={idx} className="ma8">
                                            <Card>
                                                <h2>{title}</h2>
                                                <h5>{recipe}</h5>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <span>SKU: {SKU}</span>
                                                    <span>{publishedDate.slice(0, 10)}</span>
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