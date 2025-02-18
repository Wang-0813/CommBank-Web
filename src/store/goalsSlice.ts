import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Goal } from '../api/types'
import { RootState } from './store'

export interface GoalsState {
  map: IdToGoal
  list: string[]
}

export interface IdToGoal {
  [id: string]: Goal
}

// ✅ 2️⃣ 确保 `initialState` 里包含 `icon`
const initialState: GoalsState = {
  map: {
    "1": {
      id: "1",
      name: "Buy a car",
      icon: "🚗",  // ✅ 默认 emoji
      targetAmount: 5000,
      balance: 1000,
      targetDate: new Date("2025-12-31"),
      created: new Date(),
      accountId: "123456",
      transactionIds: [],
      tagIds: []
    }
  },
  list: ["1"],
}

// ✅ 3️⃣ 确保 `icon` 在 `createGoal` 和 `updateGoal` 里被正确存储
export const goalsSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    createGoal: (state, action: PayloadAction<Goal>) => {
      state.map[action.payload.id] = {
        ...action.payload,
        icon: action.payload.icon || "🎯", // ✅ 默认 emoji
      };
      state.list.push(action.payload.id);
    },

    updateGoal: (state, action: PayloadAction<Goal>) => {
      if (state.map[action.payload.id]) {
        state.map[action.payload.id] = {
          ...state.map[action.payload.id],
          ...action.payload, // ✅ 确保 icon 也能更新
        };
      }
    },
  },
})

// ✅ 4️⃣ 确保 Redux selectors 也能获取 `icon`
export const { createGoal, updateGoal } = goalsSlice.actions

export const selectGoalsMap = (state: RootState) => state.goals.map
export const selectGoalsList = (state: RootState) => state.goals.list

export default goalsSlice.reducer

