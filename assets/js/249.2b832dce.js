"use strict";
exports.id = 249;
exports.ids = [249];
exports.modules = {

/***/ 15249:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  SearchView: () => (/* binding */ SearchView)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(74848);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-accessible-icon/dist/index.mjs
var dist = __webpack_require__(23854);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(96540);
// EXTERNAL MODULE: ./node_modules/@markprompt/react/dist/icons.js
var icons = __webpack_require__(3610);
;// CONCATENATED MODULE: ./node_modules/@markprompt/react/dist/search/SearchResult.js




// Source: https://github.com/shuding/nextra/blob/main/packages/nextra-theme-docs/src/components/highlight-matches.tsx
const HighlightMatches = (0,react.memo)(function HighlightMatches({ value, match, }) {
    if (!match || match === '')
        return (0,jsx_runtime.jsx)(jsx_runtime.Fragment, { children: value });
    const splitText = value ? value.split('') : [];
    const escapedSearch = match.trim().replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
    const regexp = RegExp('(' + escapedSearch.replaceAll(' ', '|') + ')', 'ig');
    let result;
    let id = 0;
    let index = 0;
    const res = [];
    if (value) {
        while ((result = regexp.exec(value)) !== null) {
            res.push((0,jsx_runtime.jsxs)(react.Fragment, { children: [splitText.splice(0, result.index - index).join(''), (0,jsx_runtime.jsx)("span", { className: "MarkpromptMatch", children: splitText.splice(0, regexp.lastIndex - result.index).join('') })] }, id++));
            index = regexp.lastIndex;
        }
    }
    return ((0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [res, splitText.join('')] }));
});
const SearchResult = (0,react.forwardRef)((props, ref) => {
    const { href, title, heading, subtitle, onMouseMove, onClick, searchQuery, linkAs, ...rest } = props;
    const Link = linkAs ?? 'a';
    return ((0,jsx_runtime.jsx)("li", { ...rest, ref: ref, className: "MarkpromptSearchResult", children: (0,jsx_runtime.jsx)(Link, { href: href, className: "MarkpromptSearchResultLink", children: (0,jsx_runtime.jsxs)("div", { onMouseMove: onMouseMove, onClick: onClick, className: "MarkpromptSearchResultContainer", children: [(0,jsx_runtime.jsx)("div", { className: "MarkpromptSearchResultIconWrapper MarkpromptSearchResultIconWrapperBordered", children: href?.includes('#') ? ((0,jsx_runtime.jsx)(icons/* HashIcon */.Se, { className: "MarkpromptSearchResultIcon" })) : ((0,jsx_runtime.jsx)(icons/* FileTextIcon */.ds, { className: "MarkpromptSearchResultIcon" })) }), (0,jsx_runtime.jsxs)("div", { className: "MarkpromptSearchResultContentWrapper", children: [heading && ((0,jsx_runtime.jsx)("div", { className: "MarkpromptSearchResultHeading", children: (0,jsx_runtime.jsx)(HighlightMatches, { value: heading, match: searchQuery }) })), (0,jsx_runtime.jsx)("div", { className: "MarkpromptSearchResultTitle", children: (0,jsx_runtime.jsx)(HighlightMatches, { value: title, match: searchQuery }) }), subtitle && ((0,jsx_runtime.jsx)("div", { className: "MarkpromptSearchResultSubtitle", children: (0,jsx_runtime.jsx)(HighlightMatches, { value: subtitle, match: searchQuery }) }))] })] }) }) }));
});
SearchResult.displayName = 'Markprompt.SearchResult';

//# sourceMappingURL=SearchResult.js.map
// EXTERNAL MODULE: ./node_modules/@markprompt/core/dist/utils.js
var utils = __webpack_require__(58849);
;// CONCATENATED MODULE: ./node_modules/@markprompt/core/dist/search.js

const DEFAULT_SUBMIT_SEARCH_QUERY_OPTIONS = {
    limit: 8,
    apiUrl: 'https://api.markprompt.com/search',
};
/**
 * Submit a search query to the Markprompt Search API.
 * @param query - Search query
 * @param projectKey - Project key for the project
 * @param [options] - Optional parameters
 * @returns Search results
 */
async function search_submitSearchQuery(query, projectKey, options) {
    try {
        const { limit = DEFAULT_SUBMIT_SEARCH_QUERY_OPTIONS.limit, apiUrl = DEFAULT_SUBMIT_SEARCH_QUERY_OPTIONS.apiUrl, } = options ?? {};
        const params = new URLSearchParams({
            query,
            projectKey,
            limit: String(limit),
        });
        const res = await fetch(`${apiUrl}?${params.toString()}`, {
            method: 'GET',
            signal: options?.signal,
            headers: new Headers({
                'X-Markprompt-API-Version': '2023-12-01',
            }),
        });
        if (!res.ok) {
            const message = await (0,utils/* getErrorMessage */.u1)(res);
            throw new Error(`Failed to fetch search results: ${message || 'Unknown error'}`);
        }
        return res.json();
    }
    catch (error) {
        if ((0,utils/* isAbortError */.zf)(error)) {
            // do nothing on AbortError's, this is expected
            return undefined;
        }
        else {
            throw error;
        }
    }
}
/**
 * Submit a search query to the Algolia Docsearch API.
 * @param query - Search query
 * @param [options] - Optional parameters
 * @returns Search results
 */
async function submitAlgoliaDocsearchQuery(query, options) {
    try {
        const provider = options?.provider;
        if (provider?.name !== 'algolia') {
            throw new Error(`Unknown provider: ${provider?.name}`);
        }
        const { limit = DEFAULT_SUBMIT_SEARCH_QUERY_OPTIONS.limit } = options ?? {};
        const res = await fetch(`https://${provider.appId}-dsn.algolia.net/1/indexes/${provider.indexName}/query`, {
            method: 'POST',
            body: JSON.stringify({
                query,
                hitsPerPage: limit,
                getRankingInfo: 1,
                ...options?.provider?.searchParameters,
            }),
            signal: options?.signal,
            headers: {
                'X-Algolia-API-Key': provider.apiKey,
                'X-Algolia-Application-Id': provider.appId,
            },
        });
        if (!res.ok) {
            const message = await (0,utils/* getErrorMessage */.u1)(res);
            throw new Error(`Failed to fetch search results: ${message || 'Unknown error'}`);
        }
        return res.json();
    }
    catch (error) {
        if ((0,utils/* isAbortError */.zf)(error)) {
            // do nothing on AbortError's, this is expected
            return undefined;
        }
        else {
            throw error;
        }
    }
}
//# sourceMappingURL=search.js.map
;// CONCATENATED MODULE: ./node_modules/p-debounce/index.js
const pDebounce = (fn, wait, options = {}) => {
	if (!Number.isFinite(wait)) {
		throw new TypeError('Expected `wait` to be a finite number');
	}

	let leadingValue;
	let timeout;
	let resolveList = [];

	return function (...arguments_) {
		return new Promise(resolve => {
			const shouldCallNow = options.before && !timeout;

			clearTimeout(timeout);

			timeout = setTimeout(() => {
				timeout = null;

				const result = options.before ? leadingValue : fn.apply(this, arguments_);

				for (resolve of resolveList) {
					resolve(result);
				}

				resolveList = [];
			}, wait);

			if (shouldCallNow) {
				leadingValue = fn.apply(this, arguments_);
				resolve(leadingValue);
			} else {
				resolveList.push(resolve);
			}
		});
	};
};

pDebounce.promise = function_ => {
	let currentPromise;

	return async function (...arguments_) {
		if (currentPromise) {
			return currentPromise;
		}

		try {
			currentPromise = function_.apply(this, arguments_);
			return await currentPromise;
		} finally {
			currentPromise = undefined;
		}
	};
};

/* harmony default export */ const p_debounce = (pDebounce);

// EXTERNAL MODULE: ./node_modules/@markprompt/react/dist/constants.js
var constants = __webpack_require__(86645);
// EXTERNAL MODULE: ./node_modules/@markprompt/react/dist/useAbortController.js
var useAbortController = __webpack_require__(37505);
;// CONCATENATED MODULE: ./node_modules/@markprompt/react/dist/search/useSearch.js





function useSearch({ debug, projectKey, searchOptions, }) {
    const [state, setState] = (0,react.useState)('indeterminate');
    const [searchQuery, setSearchQuery] = (0,react.useState)('');
    const [searchResults, setSearchResults] = (0,react.useState)([]);
    const { ref: controllerRef, abort } = (0,useAbortController/* useAbortController */.I)();
    const submitSearchQuery = (0,react.useCallback)((searchQuery) => {
        abort();
        // reset state if the query was set (back) to empty
        if (searchQuery === '') {
            if (controllerRef.current)
                controllerRef.current.abort();
            setSearchResults([]);
            setState('indeterminate');
            return;
        }
        setState('preload');
        const controller = new AbortController();
        controllerRef.current = controller;
        let promise;
        if (searchOptions?.provider?.name === 'algolia') {
            promise = submitAlgoliaDocsearchQuery(searchQuery, {
                ...searchOptions,
                signal: controller.signal,
            }).then((result) => result?.hits || []);
        }
        else {
            promise = search_submitSearchQuery(searchQuery, projectKey, {
                ...searchOptions,
                signal: controller.signal,
            }).then((result) => {
                if (debug) {
                    // Show debug info return from Markprompt search API
                    // eslint-disable-next-line no-console
                    console.debug(JSON.stringify(result?.debug, null, 2));
                }
                return result?.data || [];
            });
        }
        promise.then((searchResults) => {
            if (controller.signal.aborted)
                return;
            if (!searchResults)
                return;
            setSearchResults(searchResultsToSearchComponentProps(searchQuery, searchResults, searchOptions) ?? []);
            // initially focus the first result
            setState('done');
        });
        promise?.catch((error) => {
            // ignore abort errors
            if ((0,utils/* isAbortError */.zf)(error))
                return;
            // todo: surface errors to the user in the UI
            // eslint-disable-next-line no-console
            console.error(error);
        });
        promise?.finally(() => {
            if (controllerRef.current === controller) {
                controllerRef.current = undefined;
            }
        });
    }, [searchOptions, abort, controllerRef, projectKey, debug]);
    return {
        state,
        searchResults,
        searchQuery,
        setSearchQuery,
        submitSearchQuery: p_debounce(submitSearchQuery, 220),
        abort,
    };
}
function searchResultsToSearchComponentProps(query, searchResults, options) {
    return searchResults.map((result) => {
        return {
            href: (options?.getHref || constants/* DEFAULT_MARKPROMPT_OPTIONS */.V.search.getHref)?.(result),
            heading: (options?.getHeading || constants/* DEFAULT_MARKPROMPT_OPTIONS */.V.search.getHeading)?.(result, query),
            title: (options?.getTitle || constants/* DEFAULT_MARKPROMPT_OPTIONS */.V.search.getTitle)?.(result, query) || 'Untitled',
            subtitle: (options?.getSubtitle || constants/* DEFAULT_MARKPROMPT_OPTIONS */.V.search.getSubtitle)?.(result, query),
        };
    });
}
//# sourceMappingURL=useSearch.js.map
// EXTERNAL MODULE: ./node_modules/@markprompt/react/dist/primitives/headless.js + 165 modules
var headless = __webpack_require__(16541);
// EXTERNAL MODULE: ./node_modules/@markprompt/react/dist/useDefaults.js
var useDefaults = __webpack_require__(16881);
;// CONCATENATED MODULE: ./node_modules/@markprompt/react/dist/search/SearchView.js










const searchInputName = 'markprompt-search';
function SearchView(props) {
    const { activeView, debug, onDidSelectResult, onDidSelectAsk, projectKey } = props;
    if (!projectKey) {
        throw new Error(`Markprompt: a project key is required. Make sure to pass your Markprompt project key to <SearchView />.`);
    }
    // We are also merging defaults in the Markprompt component, but this makes
    // sure that standalone SearchView components also have defaults as expected.
    const searchOptions = (0,useDefaults/* useDefaults */.o)({ ...props.searchOptions }, constants/* DEFAULT_MARKPROMPT_OPTIONS */.V.search);
    const inputRef = (0,react.useRef)(null);
    const { abort, searchResults, searchQuery, state, setSearchQuery, submitSearchQuery, } = useSearch({
        debug,
        projectKey,
        searchOptions,
    });
    const [activeSearchResult, setActiveSearchResult] = (0,react.useState)();
    // Show "Ask AI" if the query contains a space between two words
    const isAskVisible = props.layout === 'panels' && searchQuery.trim().includes(' ');
    const isActiveSearchResultAsk = (0,react.useMemo)(() => {
        return activeSearchResult?.id === 'ask';
    }, [activeSearchResult?.id]);
    (0,react.useEffect)(() => {
        if (isAskVisible) {
            return;
        }
        // If the search query changes, unset the active search result.
        // This should only be done when "Ask AI" is not enabled.
        if (!isActiveSearchResultAsk) {
            setActiveSearchResult(undefined);
        }
    }, [searchQuery, isAskVisible, isActiveSearchResultAsk]);
    (0,react.useEffect)(() => {
        // If the search results change, set the active search result to the
        // first result
        if (isAskVisible) {
            setActiveSearchResult({ id: 'ask' });
        }
        else if (searchResults.length > 0) {
            setActiveSearchResult({ id: 'markprompt-result-0' });
        }
    }, [searchResults, isAskVisible]);
    (0,react.useEffect)(() => {
        // Bring form input in focus when activeView changes.
        inputRef.current?.focus();
    }, [activeView]);
    (0,react.useEffect)(() => {
        // Abort search requests when the view changes to something
        // that's not search and on unmounting the component
        if (activeView && activeView !== 'search')
            abort();
        return () => abort();
    }, [abort, activeView]);
    const handleKeyDown = (0,react.useCallback)((event) => {
        switch (event.key) {
            case 'ArrowDown': {
                if (!activeSearchResult)
                    return;
                const defaultSearches = searchOptions?.defaultView?.searches || [];
                const numAllDisplayedResults = searchResults.length + defaultSearches.length;
                if (activeSearchResult.id !== 'ask' &&
                    activeSearchResult.id?.endsWith(`${numAllDisplayedResults - 1}`)) {
                    // We're at the end of the list
                    return;
                }
                event.preventDefault();
                let nextActiveSearchResultId;
                if (activeSearchResult.id === 'ask') {
                    nextActiveSearchResultId = 'markprompt-result-0';
                }
                else {
                    nextActiveSearchResultId = activeSearchResult.id?.replace(/\d+$/, (match) => String(Number(match) + 1));
                }
                setActiveSearchResult({
                    id: nextActiveSearchResultId,
                    trigger: 'keyboard',
                });
                const el = document.querySelector(`#${nextActiveSearchResultId} > a`);
                if (!el)
                    return;
                break;
            }
            case 'ArrowUp': {
                if (!activeSearchResult)
                    return;
                if (activeSearchResult.id?.endsWith('-0')) {
                    if (isAskVisible) {
                        event.preventDefault();
                        setActiveSearchResult({
                            id: 'ask',
                            trigger: 'keyboard',
                        });
                    }
                    return;
                }
                event.preventDefault();
                const previousActiveSearchResult = activeSearchResult.id?.replace(/\d+$/, (match) => String(Number(match) - 1));
                setActiveSearchResult({
                    id: previousActiveSearchResult,
                    trigger: 'keyboard',
                });
                const el = document.querySelector(`#${previousActiveSearchResult} > a`);
                if (!el)
                    return;
                break;
            }
            case 'Enter': {
                if (event.ctrlKey || event.metaKey)
                    return;
                if (!activeSearchResult && !isAskVisible)
                    return;
                event.preventDefault();
                if (!activeSearchResult || activeSearchResult.id === 'ask') {
                    const el = document.querySelector('#ask');
                    el?.click();
                    return;
                }
                if (!activeSearchResult) {
                    return;
                }
                // Assumption here is that the search result will always contain
                // an a element
                const el = document.querySelector(`#${activeSearchResult.id} a`);
                // TODO: reset search query and result
                if (!el)
                    return;
                el.click();
                break;
            }
        }
    }, [
        activeSearchResult,
        searchResults.length,
        searchOptions?.defaultView?.searches,
        isAskVisible,
    ]);
    const handleChange = (0,react.useCallback)((event) => {
        setSearchQuery(event.target.value);
        submitSearchQuery(event.target.value);
    }, [setSearchQuery, submitSearchQuery]);
    const handleSubmit = (0,react.useCallback)(async (event) => {
        event.preventDefault();
        await submitSearchQuery(searchQuery);
    }, [searchQuery, submitSearchQuery]);
    return ((0,jsx_runtime.jsxs)("div", { className: "MarkpromptSearchView", children: [(0,jsx_runtime.jsx)(headless/* Form */.lV, { className: "MarkpromptForm", onSubmit: handleSubmit, children: (0,jsx_runtime.jsxs)("div", { className: "MarkpromptPromptWrapper", children: [(0,jsx_runtime.jsx)(headless/* Prompt */.XG, { ref: inputRef, className: "MarkpromptPrompt", name: searchInputName, placeholder: searchOptions?.placeholder, labelClassName: "MarkpromptPromptLabel", value: searchQuery, onChange: handleChange, onKeyDown: handleKeyDown, showSubmitButton: false, "aria-controls": "markprompt-search-results", "aria-activedescendant": activeSearchResult?.id, label: (0,jsx_runtime.jsx)(dist/* Root */.b, { label: searchOptions?.label, children: (0,jsx_runtime.jsx)(icons/* SearchIcon */.WI, { className: "MarkpromptSearchIconAccented" }) }) }), (0,jsx_runtime.jsxs)("button", { className: searchOptions.askLabel
                                ? 'MarkpromptBorderedButton'
                                : 'MarkpromptGhostButton', type: "button", style: { flexGrow: 'none', marginRight: '0.25rem' }, onClick: () => onDidSelectAsk?.(), children: [(0,jsx_runtime.jsx)(icons/* SparklesIcon */.BZ, { style: searchOptions.askLabel
                                        ? { width: 16, height: 16, opacity: 0.4 }
                                        : { width: 18, height: 18 } }), searchOptions.askLabel && (0,jsx_runtime.jsx)("span", { children: searchOptions.askLabel })] })] }) }), (0,jsx_runtime.jsx)(SearchResultsContainer, { activeSearchResult: activeSearchResult, onDidSelectResult: onDidSelectResult, onDidSelectAsk: () => onDidSelectAsk?.(searchQuery), searchQuery: searchQuery, searchResults: searchResults, searchOptions: searchOptions, linkAs: props.linkAs, setActiveSearchResult: setActiveSearchResult, state: state, isAskVisible: isAskVisible })] }));
}
function SearchResultsContainer(props) {
    const { searchQuery, searchResults, state, activeSearchResult, setActiveSearchResult, onDidSelectResult, onDidSelectAsk, searchOptions, linkAs, isAskVisible, } = props;
    const onMouseMovedOverSearchResult = (0,react.useRef)(null);
    (0,react.useEffect)(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowDown' && activeSearchResult === undefined) {
                if (searchResults.length > 0 ||
                    (searchOptions?.defaultView?.searches || []).length > 0) {
                    setActiveSearchResult({
                        id: 'markprompt-result-0',
                        trigger: 'keyboard',
                    });
                    const el = document.querySelector(`#${searchInputName}`);
                    if (el instanceof HTMLInputElement)
                        el.focus();
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [
        activeSearchResult,
        searchResults,
        setActiveSearchResult,
        searchOptions?.defaultView?.searches,
    ]);
    (0,react.useEffect)(() => {
        // Do not scroll into view unless using keyboard navigation.
        // While using the mouse, we don't want movable hit targets.
        if (!activeSearchResult?.id || activeSearchResult.trigger !== 'keyboard') {
            return;
        }
        const element = document.getElementById(activeSearchResult.id);
        element?.focus();
        element?.scrollIntoView({ block: 'nearest' });
    }, [activeSearchResult, searchResults]);
    return ((0,jsx_runtime.jsxs)("div", { className: "MarkpromptSearchResultsContainer", children: [isAskVisible && ((0,jsx_runtime.jsx)("div", { className: "MarkpromptSearchResult", "aria-selected": !activeSearchResult?.id || activeSearchResult.id === 'ask', id: "ask", style: { cursor: 'pointer' }, onMouseMove: () => {
                    // We use a mouse move event, instead of mouse over or
                    // mouse enter. Indeed, onMouseOver and onMouseEnter will
                    // trigger at each rerender. This is a problem when scrolling
                    // the list using the keyboard: it will automatically reselect
                    // the result that the mouse is over.
                    if (onMouseMovedOverSearchResult?.current === 'ask') {
                        return;
                    }
                    onMouseMovedOverSearchResult.current = 'ask';
                    setActiveSearchResult({ id: 'ask', trigger: 'mouse' });
                    return true;
                }, onClick: onDidSelectAsk, children: (0,jsx_runtime.jsx)("div", { className: "MarkpromptSearchResultLink", children: (0,jsx_runtime.jsxs)("div", { className: "MarkpromptSearchResultContainer", children: [(0,jsx_runtime.jsx)("div", { className: "MarkpromptSearchResultIconWrapper MarkpromptSearchResultIconWrapperBordered", children: (0,jsx_runtime.jsx)(icons/* SparklesIcon */.BZ, { className: "MarkpromptSearchResultIcon" }) }), (0,jsx_runtime.jsx)("div", { className: "MarkpromptSearchResultContentWrapper", children: (0,jsx_runtime.jsxs)("div", { className: "MarkpromptSearchResultTitle", children: [(0,jsx_runtime.jsxs)("span", { className: "MarkpromptSearchResultTitleAccent", children: [searchOptions?.askLabel ?? 'Ask AI', ":"] }), ' ', searchQuery] }) }), (0,jsx_runtime.jsx)(icons/* ChevronRightIcon */.vK, { className: "MarkpromptSearchResultIcon" })] }) }) })), state === 'done' &&
                searchResults.length === 0 &&
                searchQuery.trim().length > 0 && ((0,jsx_runtime.jsx)("div", { className: "MarkpromptNoSearchResults", children: (0,jsx_runtime.jsxs)("p", { children: ["No matches found for ", (0,jsx_runtime.jsxs)("span", { children: ["\u201C", searchQuery, "\u201D"] })] }) })), (0,jsx_runtime.jsx)(headless/* SearchResults */.LT, { searchResults: searchResults, searchOptions: searchOptions, className: "MarkpromptSearchResults", headingClassName: "MarkpromptSearchResultSectionHeading", SearchResultComponent: ({ index, ...rest }) => {
                    const id = `markprompt-result-${index}`;
                    return ((0,jsx_runtime.jsx)(SearchResult, { ...rest, id: id, searchQuery: searchQuery, onMouseMove: () => {
                            // We use a mouse move event, instead of mouse over or
                            // mouse enter. Indeed, onMouseOver and onMouseEnter will
                            // trigger at each rerender. This is a problem when scrolling
                            // the list using the keyboard: it will automatically reselect
                            // the result that the mouse is over.
                            if (onMouseMovedOverSearchResult?.current === id) {
                                return true;
                            }
                            onMouseMovedOverSearchResult.current = id;
                            setActiveSearchResult({ id, trigger: 'mouse' });
                            return true;
                        }, onClick: () => {
                            onDidSelectResult?.();
                        }, "aria-selected": id === activeSearchResult?.id, linkAs: linkAs }));
                } })] }));
}
//# sourceMappingURL=SearchView.js.map

/***/ })

};
;