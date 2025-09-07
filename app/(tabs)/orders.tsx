import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';
import { Clock, CircleCheck as CheckCircle, Truck, MapPin, Phone, MessageSquare, Star, Package, CreditCard, X } from 'lucide-react-native';

interface Order {
  id: string;
  service: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  agent: {
    name: string;
    phone: string;
    rating: number;
  };
  pickup: string;
  delivery: string;
  amount: number;
  date: string;
  estimatedTime: string;
  description: string;
}

export default function OrdersScreen() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const orders: Order[] = [
    {
      id: '1001',
      service: 'Grocery Shopping',
      status: 'in_progress',
      agent: {
        name: 'John Kamau',
        phone: '+254712345678',
        rating: 4.8,
      },
      pickup: 'Naivas Supermarket, Kerugoya',
      delivery: 'Kerugoya University, Main Campus',
      amount: 850,
      date: '2025-01-13',
      estimatedTime: '15 mins',
      description: 'Rice, cooking oil, vegetables, and fruits',
    },
    {
      id: '1002',
      service: 'Document Printing',
      status: 'accepted',
      agent: {
        name: 'Mary Wanjiku',
        phone: '+254723456789',
        rating: 4.9,
      },
      pickup: 'Print Shop, Town Center',
      delivery: 'Kerugoya University Library',
      amount: 200,
      date: '2025-01-13',
      estimatedTime: '30 mins',
      description: '10 copies of research proposal, spiral binding',
    },
    {
      id: '1003',
      service: 'Pharmacy Pickup',
      status: 'completed',
      agent: {
        name: 'Peter Mwangi',
        phone: '+254734567890',
        rating: 4.7,
      },
      pickup: 'Goodlife Pharmacy',
      delivery: 'Residential Area B',
      amount: 450,
      date: '2025-01-12',
      estimatedTime: 'Delivered',
      description: 'Prescription medication and vitamins',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'accepted': return '#3b82f6';
      case 'in_progress': return '#8b5cf6';
      case 'completed': return '#10b981';
      case 'cancelled': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'accepted': return CheckCircle;
      case 'in_progress': return Truck;
      case 'completed': return Package;
      default: return Clock;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Waiting for Agent';
      case 'accepted': return 'Agent Assigned';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const activeOrders = orders.filter(order => order.status !== 'completed');
  const completedOrders = orders.filter(order => order.status === 'completed');
  const displayOrders = activeTab === 'active' ? activeOrders : completedOrders;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
        <Text style={styles.headerSubtitle}>Track your errands</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
            Active ({activeOrders.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            Completed ({completedOrders.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {displayOrders.map((order) => {
          const StatusIcon = getStatusIcon(order.status);
          return (
            <TouchableOpacity
              key={order.id}
              style={styles.orderCard}
              onPress={() => setSelectedOrder(order)}
              activeOpacity={0.8}
            >
              <View style={styles.orderHeader}>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderService}>{order.service}</Text>
                  <Text style={styles.orderId}>Order #{order.id}</Text>
                </View>
                <View style={styles.orderStatus}>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
                    <StatusIcon size={16} color={getStatusColor(order.status)} />
                    <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                      {getStatusText(order.status)}
                    </Text>
                  </View>
                  <Text style={styles.orderAmount}>KSh {order.amount}</Text>
                </View>
              </View>

              <View style={styles.orderDetails}>
                <View style={styles.locationInfo}>
                  <MapPin size={16} color="#64748b" />
                  <Text style={styles.locationText} numberOfLines={1}>
                    {order.pickup} → {order.delivery}
                  </Text>
                </View>
                <View style={styles.timeInfo}>
                  <Clock size={16} color="#64748b" />
                  <Text style={styles.timeText}>{order.estimatedTime}</Text>
                </View>
              </View>

              {order.status !== 'completed' && order.status !== 'pending' && (
                <View style={styles.agentInfo}>
                  <Text style={styles.agentLabel}>Agent: {order.agent.name}</Text>
                  <View style={styles.agentActions}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Phone size={16} color="#2563eb" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <MessageSquare size={16} color="#2563eb" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        {displayOrders.length === 0 && (
          <View style={styles.emptyState}>
            <Package size={64} color="#9ca3af" />
            <Text style={styles.emptyTitle}>
              No {activeTab} orders
            </Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'active' 
                ? 'Your active orders will appear here' 
                : 'Your completed orders will appear here'}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Order Detail Modal */}
      <Modal
        visible={!!selectedOrder}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSelectedOrder(null)}>
              <X size={24} color="#374151" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Order Details</Text>
            <View style={{ width: 24 }} />
          </View>

          {selectedOrder && (
            <ScrollView style={styles.modalContent}>
              <View style={styles.orderDetailCard}>
                <View style={styles.orderDetailHeader}>
                  <Text style={styles.orderDetailService}>{selectedOrder.service}</Text>
                  <Text style={styles.orderDetailId}>#{selectedOrder.id}</Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(selectedOrder.status) + '20' }
                  ]}>
                    <Text style={[styles.statusText, { color: getStatusColor(selectedOrder.status) }]}>
                      {getStatusText(selectedOrder.status)}
                    </Text>
                  </View>
                </View>

                <View style={styles.orderDetailSection}>
                  <Text style={styles.sectionTitle}>Service Details</Text>
                  <Text style={styles.sectionContent}>{selectedOrder.description}</Text>
                </View>

                <View style={styles.orderDetailSection}>
                  <Text style={styles.sectionTitle}>Locations</Text>
                  <View style={styles.locationItem}>
                    <MapPin size={16} color="#10b981" />
                    <View>
                      <Text style={styles.locationLabel}>Pickup</Text>
                      <Text style={styles.locationValue}>{selectedOrder.pickup}</Text>
                    </View>
                  </View>
                  <View style={styles.locationItem}>
                    <MapPin size={16} color="#ef4444" />
                    <View>
                      <Text style={styles.locationLabel}>Delivery</Text>
                      <Text style={styles.locationValue}>{selectedOrder.delivery}</Text>
                    </View>
                  </View>
                </View>

                {selectedOrder.status !== 'pending' && selectedOrder.agent && (
                  <View style={styles.orderDetailSection}>
                    <Text style={styles.sectionTitle}>Agent Information</Text>
                    <View style={styles.agentDetail}>
                      <View style={styles.agentInfo}>
                        <Text style={styles.agentName}>{selectedOrder.agent.name}</Text>
                        <View style={styles.agentRating}>
                          <Star size={16} color="#f59e0b" fill="#f59e0b" />
                          <Text style={styles.ratingText}>{selectedOrder.agent.rating}</Text>
                        </View>
                      </View>
                      <View style={styles.agentActions}>
                        <TouchableOpacity style={styles.contactButton}>
                          <Phone size={16} color="#fff" />
                          <Text style={styles.contactButtonText}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.contactButton, styles.chatButton]}>
                          <MessageSquare size={16} color="#2563eb" />
                          <Text style={[styles.contactButtonText, { color: '#2563eb' }]}>Chat</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}

                <View style={styles.orderDetailSection}>
                  <Text style={styles.sectionTitle}>Payment</Text>
                  <View style={styles.paymentInfo}>
                    <CreditCard size={16} color="#64748b" />
                    <Text style={styles.paymentAmount}>KSh {selectedOrder.amount}</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#2563eb',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderInfo: {
    flex: 1,
  },
  orderService: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  orderId: {
    fontSize: 14,
    color: '#64748b',
  },
  orderStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  orderAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  orderDetails: {
    gap: 8,
    marginBottom: 16,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    fontSize: 14,
    color: '#64748b',
  },
  agentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  agentLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  agentActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  orderDetailCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  orderDetailHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  orderDetailService: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 4,
  },
  orderDetailId: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 12,
  },
  orderDetailSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  locationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 2,
  },
  locationValue: {
    fontSize: 16,
    color: '#374151',
  },
  agentDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  agentRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  chatButton: {
    backgroundColor: '#eff6ff',
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10b981',
  },
});