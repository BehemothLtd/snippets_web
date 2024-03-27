export function useCommon() {
  function modifyItemInList(modified, list, matchingStoreItem) {
    const modifiedItemIndex = list.value.findIndex(
      (s) => Number(s.id) === Number(modified.id)
    );
    const modifiedItem = list.value[modifiedItemIndex];
    list.value[modifiedItemIndex] = {
      ...modifiedItem,
      ...modified,
      id: modifiedItem.id,
    };
    // change detail item in store
    if (
      matchingStoreItem.value &&
      Number(matchingStoreItem.value?.id) === Number(modified?.id)
    ) {
      matchingStoreItem.value = {
        ...matchingStoreItem.value,
        ...modified,
        id: modifiedItem.id,
      };
    }
  }

  return {
    modifyItemInList,
  };
}
