//
//  ActionsView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 12/01/2026.
//

import SwiftUI

struct ActionsView: View {
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
			allCards: serviceStore.fromActionsToCard(serviceName: service.name),
			isAction: true
		)
		.searchable(text: $searchText)
		.navigationTitle(LocalizedStringResource.actionsTitle)
		.onAppear {
			viewModel.selectedActionService = service
		}
	}
}
