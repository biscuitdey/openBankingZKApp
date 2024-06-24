export const setItemInLocalStorage = async (
  itemName: string,
  item: string
): Promise<void> => {
  try {
    window.localStorage.setItem(itemName, item);
    console.log(`${itemName} stored successfully.`);
  } catch (error) {
    console.error(`Failed to store ${itemName}`, error);
  }
};

export const getItemInLocalStorage = async (
  itemName: string
): Promise<string | null> => {
  try {
    const item = window.localStorage.getItem(itemName);
    if (item) {
      console.log(`${itemName} retrieved successfully.`);
    } else {
      console.log(`No ${itemName} found.`);
    }
    return item;
  } catch (error) {
    console.error(`Failed to store ${itemName}`, error);
    return null;
  }
};
