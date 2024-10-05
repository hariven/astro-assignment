import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, HStack, Popover, PopoverBody, PopoverContent, PopoverFooter, PopoverTrigger, Radio, RadioGroup, Stack, Switch, Text, useColorModeValue, } from "@chakra-ui/react";
import { useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
//   import { MotionHStack } from "../../utils/motion";
//   import { motion } from "framer-motion";
import { categoryList, languageList } from "../utils/lists";
const FilterSection = ({ filters, setFilters }) => {
    const [selectedCat, setSelectedCat] = useState(filters.category || "All");
    const [selectedLang, setSelectedLang] = useState(filters.language || "All");
    console.log({ selectedCat }, { selectedLang });
    return (_jsxs(HStack, { my: 3, align: "center", justify: { base: "start", md: "flex-end" }, children: [_jsxs(HStack, { background: useColorModeValue("#EDF2F7", "#FFFFFF14"), borderRadius: "8px", w: "120px", h: "40px", justify: "center", spacing: 5, children: [_jsx(Text, { fontWeight: "700", children: "HD?" }), _jsx(Switch, { isChecked: filters?.isHd, onChange: (e) => setFilters({
                            ...filters,
                            isHd: e.target.checked,
                        }) })] }), _jsx(Popover, { children: ({ onClose }) => (_jsxs(_Fragment, { children: [_jsx(PopoverTrigger, { children: _jsx(Button, { rightIcon: _jsx(ChevronDownIcon, {}), children: "Category" }) }), _jsxs(PopoverContent, { children: [_jsx(PopoverBody, { children: _jsx(RadioGroup, { value: selectedCat, defaultValue: selectedCat, onChange: (e) => setSelectedCat(e), children: _jsx(Stack, { children: categoryList?.map((cat) => {
                                                return (_jsx(Radio, { value: cat, children: cat }, cat));
                                            }) }) }) }), _jsx(PopoverFooter, { display: "flex", justifyContent: "flex-end", children: _jsx(Button, { colorScheme: "blue", onClick: () => {
                                            setFilters({
                                                ...filters,
                                                category: selectedCat === "All" ? undefined : selectedCat,
                                            });
                                            onClose();
                                        }, children: "Save" }) })] })] })) }), _jsx(Popover, { children: ({ onClose }) => (_jsxs(_Fragment, { children: [_jsx(PopoverTrigger, { children: _jsx(Button, { rightIcon: _jsx(ChevronDownIcon, {}), children: "Language" }) }), _jsxs(PopoverContent, { children: [_jsx(PopoverBody, { children: _jsx(RadioGroup, { value: selectedLang, onChange: (e) => setSelectedLang(e), children: _jsx(Stack, { children: languageList?.map((lang) => {
                                                return (_jsx(Radio, { value: lang, children: lang }, lang));
                                            }) }) }) }), _jsx(PopoverFooter, { display: "flex", justifyContent: "flex-end", children: _jsx(Button, { colorScheme: "blue", onClick: () => {
                                            setFilters({
                                                ...filters,
                                                language: selectedLang === "All" ? undefined : selectedLang,
                                            });
                                            onClose();
                                        }, children: "Save" }) })] })] })) })] }));
};
export default FilterSection;
