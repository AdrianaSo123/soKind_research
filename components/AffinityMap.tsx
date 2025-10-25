'use client';

interface AffinityGroup {
  category: string;
  items: string[];
}

interface AffinityMapProps {
  groups: AffinityGroup[];
}

const colors = [
  { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-900', tag: 'bg-blue-100', dot: 'bg-blue-500' },
  { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-900', tag: 'bg-green-100', dot: 'bg-green-500' },
  { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-900', tag: 'bg-yellow-100', dot: 'bg-yellow-500' },
  { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-900', tag: 'bg-pink-100', dot: 'bg-pink-500' },
  { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-900', tag: 'bg-purple-100', dot: 'bg-purple-500' },
  { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-900', tag: 'bg-indigo-100', dot: 'bg-indigo-500' },
  { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-900', tag: 'bg-orange-100', dot: 'bg-orange-500' },
  { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-900', tag: 'bg-teal-100', dot: 'bg-teal-500' },
];

export default function AffinityMap({ groups }: AffinityMapProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {groups.map((group, idx) => {
        const colorScheme = colors[idx % colors.length];
        return (
          <div
            key={idx}
            className={`p-6 ${colorScheme.bg} rounded-xl border-2 ${colorScheme.border} hover:shadow-lg transition-all`}
          >
            <div className="flex items-start gap-3 mb-5">
              <div className={`w-3 h-3 ${colorScheme.dot} rounded-full mt-2 flex-shrink-0`}></div>
              <h4 className={`font-bold ${colorScheme.text} text-lg leading-tight font-sans`}>
                {group.category}
              </h4>
            </div>
            <div className="space-y-2.5">
              {group.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className={`p-3.5 ${colorScheme.tag} rounded-lg shadow-sm text-sm text-gray-800 border border-gray-200/50 hover:scale-[1.02] transition-transform font-serif leading-relaxed`}
                >
                  <span className={`inline-block w-1.5 h-1.5 ${colorScheme.dot} rounded-full mr-2.5`}></span>
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-300/40">
              <p className="text-xs text-gray-600 font-sans font-semibold">
                {group.items.length} {group.items.length === 1 ? 'observation' : 'observations'}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
