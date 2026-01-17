//
//  ReactionServiceSelectionView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 13/01/2026.
//

import SwiftUI

struct ReactionServiceSelectionView: View {
	@State private var searchText: String = ""
	@EnvironmentObject var serviceStore: ServiceStore
	@ObservedObject var viewModel: AreaCreationViewModel

	let action: ServiceAction

	var body: some View {
		CollectionView(
			searchText: searchText,
			allCards: serviceStore.fromServiceToCardItem()
		)
		.searchable(text: $searchText)
		.navigationTitle(LocalizedStringResource.servicesTitle)
		.onAppear {
			viewModel.selectedAction = action
			print(
				"\(LocalizedStringResource.areaCreationActionLockedTitle) \(action.name)"
			)
		}
	}
}
