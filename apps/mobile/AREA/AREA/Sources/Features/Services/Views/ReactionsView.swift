//
//  ReactionsView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 13/01/2026.
//

import SwiftUI

struct ReactionsView: View {
	let service: Service
	@State private var searchText: String = ""
	@EnvironmentObject var serviceStore: ServiceStore
	@ObservedObject var viewModel: AreaCreationViewModel
	@Binding var navigationPath: NavigationPath

	var body: some View {
		AreaCollectionView(
			areaViewModel: viewModel,
			navigationPath: $navigationPath,
			serviceName: service.name,
			searchText: searchText,
			allCards: serviceStore.fromReactionsToCard(serviceName: service.name),
			isAction: false
		)
		.searchable(text: $searchText)
		.navigationTitle(LocalizedStringResource.areaCreationReactionsTitle)
		.onAppear {
			viewModel.selectedReactionService = service
		}
	}
}
