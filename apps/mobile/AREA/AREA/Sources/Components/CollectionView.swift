//
//  ExpandingCardListView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 11/12/2025.
//

import SwiftUI

struct CollectionView: View {
	@State private var selectedCardIndex: Int? = nil
	@EnvironmentObject var serviceStore: ServiceStore
	var searchText: String

	var body: some View {
		let allCards = serviceStore.fromServiceToCardItem()

		let filteredCards =
			searchText.isEmpty
			? allCards
			: allCards.filter { card in
				card.title.localizedCaseInsensitiveContains(searchText)
			}

		ScrollView {
			VStack(spacing: 20) {
				ForEach(filteredCards, id: \.id) { card in
					if let service = serviceStore.services.first(where: {
						$0.displayName == card.title
					}) {
						NavigationLink(value: service) {
							TableView(item: card)
						}
					} else {
						TableView(item: card)
					}
				}
			}
			.padding()
			.navigationTitle(LocalizedStringResource.servicesTitle)
		}
		.background(Color(UIColor.systemGroupedBackground))
		.navigationDestination(for: Service.self) { service in
			ActionsView(selectedService: service)
		}
	}
}
