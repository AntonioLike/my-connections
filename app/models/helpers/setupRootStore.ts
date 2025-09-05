/**
 * This file is where we do "rehydration" of your RootStore from AsyncStorage.
 * This lets you persist your state between app launches.
 *
 * Navigation state persistence is handled in navigationUtilities.tsx.
 *
 * Note that Fast Refresh doesn't play well with this file, so if you edit this,
 * do a full refresh of your app instead.
 *
 * @refresh reset
 */
import { applySnapshot, IDisposer, onSnapshot } from "mobx-state-tree"
import { RootStore, RootStoreSnapshot } from "../RootStore"
import * as storage from "../../utils/storage"
import { fetchAndSetCards } from "./cardSetupStore" // 👈 import your helper
import { fetchMe } from "./userSetupStore"
import { fetchMyConnections } from "./connectionsSetupStore"

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = "root-v1"

let _disposer: IDisposer | undefined

/**
 * Sets up the root store by restoring from AsyncStorage (if available),
 * and populating additional state as needed.
 */
export async function setupRootStore(rootStore: RootStore) {
  let restoredState: RootStoreSnapshot | undefined | null

  try {
    // Load the last known state from AsyncStorage
    restoredState = ((await storage.load(ROOT_STATE_STORAGE_KEY)) ?? {}) as RootStoreSnapshot
    applySnapshot(rootStore, restoredState)
  } catch (e) {
    if (__DEV__ && e instanceof Error) {
      console.error("Error restoring RootStore snapshot:", e.message)
    }
  }

  // Fallback: If no cards were restored, fetch from API
  if (!restoredState?.cardStore?.cards?.length) {
    try {
      await fetchAndSetCards(rootStore.cardStore)
    } catch (e) {
      if (__DEV__) console.error("Failed to fetch cards from API:", e)
    }
  }

  if (!restoredState?.userStore?.user) {
    try {
      await fetchMe(rootStore.userStore)
    } catch (e) {
      if (__DEV__) console.error("Failed to fetch cards from API:", e)
    }
  }

  if (!restoredState?.connectionStore?.connections?.length) {
    try {
      await fetchMyConnections(rootStore.connectionStore)
    } catch (e) {
      if (__DEV__) console.error("Failed to fetch cards from API:", e)
    }
  }

  // Clean up any previous snapshot listeners
  if (_disposer) _disposer()

  // Track store changes and persist them
  _disposer = onSnapshot(rootStore, (snapshot) => {
    storage.save(ROOT_STATE_STORAGE_KEY, snapshot)
  })

  const unsubscribe = () => {
    _disposer?.()
    _disposer = undefined
  }

  return { rootStore, restoredState, unsubscribe }
}
